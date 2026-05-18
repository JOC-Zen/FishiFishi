/**
 * 🧩 La Cañada Seafood — Unified Zoho Integration Client
 * 
 * Provides type-safe Server-to-Server integrations for:
 * 1. Zoho CRM: Contacts & Account synchronization.
 * 2. Zoho Inventory: Real-time stock status & items mapping.
 * 3. Zoho Books: Invoice generation & financials ledger.
 * 4. Zoho Creator: Logically driven records, workflows & forms dispatcher.
 */

export interface ZohoClientConfig {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  accountsUrl?: string; // Default: 'https://accounts.zoho.com'
  crmApiUrl?: string;    // Default: 'https://www.zohoapis.com/crm/v2'
  inventoryApiUrl?: string; // Default: 'https://www.zohoapis.com/inventory/v1'
  booksApiUrl?: string;    // Default: 'https://www.zohoapis.com/books/v3'
  creatorApiUrl?: string;  // Default: 'https://creator.zoho.com/api/v2'
  creatorOwner?: string;   // Zoho Creator Account Owner
  creatorAppName?: string; // Zoho Creator Application Name
}

export class ZohoIntegrationService {
  private static instance: ZohoIntegrationService;
  private config: ZohoClientConfig;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  private constructor() {
    this.config = {
      clientId: process.env.ZOHO_CLIENT_ID || "",
      clientSecret: process.env.ZOHO_CLIENT_SECRET || "",
      refreshToken: process.env.ZOHO_REFRESH_TOKEN || "",
      accountsUrl: process.env.ZOHO_ACCOUNTS_URL || "https://accounts.zoho.com",
      crmApiUrl: process.env.ZOHO_CRM_API_URL || "https://www.zohoapis.com/crm/v2",
      inventoryApiUrl: process.env.ZOHO_INVENTORY_API_URL || "https://www.zohoapis.com/inventory/v1",
      booksApiUrl: process.env.ZOHO_BOOKS_API_URL || "https://www.zohoapis.com/books/v3",
      creatorApiUrl: process.env.ZOHO_CREATOR_API_URL || "https://creator.zoho.com/api/v2",
      creatorOwner: process.env.ZOHO_CREATOR_OWNER || "lacanadaseafood",
      creatorAppName: process.env.ZOHO_CREATOR_APP_NAME || "b2b-portal"
    };
  }

  public static getInstance(): ZohoIntegrationService {
    if (!ZohoIntegrationService.instance) {
      ZohoIntegrationService.instance = new ZohoIntegrationService();
    }
    return ZohoIntegrationService.instance;
  }

  /**
   * Check if credentials are set
   */
  public hasCredentials(): boolean {
    return !!(this.config.clientId && this.config.clientSecret && this.config.refreshToken);
  }

  /**
   * Refreshes OAuth 2.0 access token dynamically
   */
  private async getValidAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    if (!this.hasCredentials()) {
      throw new Error("[ZohoIntegrationService] Credentials missing in environment variables.");
    }

    const url = `${this.config.accountsUrl}/oauth/v2/token?refresh_token=${this.config.refreshToken}&client_id=${this.config.clientId}&client_secret=${this.config.clientSecret}&grant_type=refresh_token`;

    try {
      const response = await fetch(url, { method: "POST" });
      const data = await response.json();

      if (data.access_token) {
        this.accessToken = data.access_token;
        this.tokenExpiry = Date.now() + (data.expires_in || 3600) * 1000 - 60000; // expiry buffer
        return data.access_token;
      }
      throw new Error(data.error || "UNKNOWN_AUTH_ERROR");
    } catch (err) {
      console.error("[ZohoIntegrationService] OAuth token refresh failed:", err);
      throw err;
    }
  }

  /**
   * Core request dispatcher to handle endpoints across CRM, Inventory, Books, and Creator
   */
  private async makeApiRequest(baseUrl: string, endpoint: string, options: RequestInit = {}): Promise<any> {
    const token = await this.getValidAccessToken();
    const url = `${baseUrl}/${endpoint}`;

    const headers = {
      "Authorization": `Zoho-oauthtoken ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });
    
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`[ZohoIntegrationService] API Error: ${response.status} - ${body}`);
    }

    return response.json();
  }

  /* =================================================================
     1. ZOHO CRM — Contacts & Accounts Modules
     ================================================================= */

  /**
   * Synchronizes client/buyer profiles to Zoho CRM Contacts
   */
  public async syncCrmContact(contactData: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    company?: string;
  }): Promise<any> {
    console.log("[Zoho CRM] Syncing contact:", contactData.email);
    
    const payload = {
      data: [{
        First_Name: contactData.first_name,
        Last_Name: contactData.last_name,
        Email: contactData.email,
        Phone: contactData.phone || "",
        Account_Name: { Account_Name: contactData.company || "General B2B Client" }
      }]
    };

    return this.makeApiRequest(this.config.crmApiUrl!, "Contacts", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }

  /* =================================================================
     2. ZOHO INVENTORY — Items & Real-Time Stock Modules
     ================================================================= */

  /**
   * Fetches real-time stock value directly from Zoho Inventory
   */
  public async getInventoryItemStock(itemSku: string): Promise<number | null> {
    if (!this.hasCredentials()) return null;
    
    try {
      console.log("[Zoho Inventory] Querying item stock for SKU:", itemSku);
      // Query items filter by SKU
      const searchRes = await this.makeApiRequest(this.config.inventoryApiUrl!, `items?sku=${itemSku}`);
      const item = searchRes.items?.[0];
      
      if (item) {
        return Number(item.stock_on_hand || 0);
      }
      return null;
    } catch (err) {
      console.error("[Zoho Inventory] Error reading stock level:", err);
      return null;
    }
  }

  /* =================================================================
     3. ZOHO BOOKS — Financial Ledgers & Invoice Generation
     ================================================================= */

  /**
   * Creates an official invoice in Zoho Books upon successful checkout
   */
  public async createBooksInvoice(invoiceData: {
    customerId: string;
    items: Array<{ itemId: string; quantity: number; rate: number }>;
  }): Promise<any> {
    console.log("[Zoho Books] Creating invoice for customer:", invoiceData.customerId);

    const payload = {
      customer_id: invoiceData.customerId,
      line_items: invoiceData.items.map(i => ({
        item_id: i.itemId,
        quantity: i.quantity,
        rate: i.rate
      }))
    };

    return this.makeApiRequest(this.config.booksApiUrl!, "invoices", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }

  /* =================================================================
     4. ZOHO CREATOR — Workflows, Form Submissions & Custom Backends
     ================================================================= */

  /**
   * Sends custom B2B application entries, order logs, or custom workflow forms
   */
  public async submitCreatorWorkflowForm(formLinkName: string, formData: any): Promise<any> {
    console.log("[Zoho Creator] Submitting record to form:", formLinkName);
    
    const owner = this.config.creatorOwner;
    const app = this.config.creatorAppName;
    const endpoint = `${owner}/${app}/form/${formLinkName}`;

    return this.makeApiRequest(this.config.creatorApiUrl!, endpoint, {
      method: "POST",
      body: JSON.stringify({ data: formData })
    });
  }

  /**
   * Fetches Sales Orders from Zoho CRM
   */
  public async getCrmSalesOrders(): Promise<any[]> {
    if (!this.hasCredentials()) return [];
    try {
      console.log("[Zoho CRM] Fetching Sales Orders...");
      const res = await this.makeApiRequest(this.config.crmApiUrl!, "Sales_Orders");
      return res.data || [];
    } catch (err) {
      console.error("[Zoho CRM] Failed to fetch Sales Orders:", err);
      return [];
    }
  }

  /**
   * Fetches Invoices from Zoho Books
   */
  public async getBooksInvoices(): Promise<any[]> {
    if (!this.hasCredentials()) return [];
    try {
      console.log("[Zoho Books] Fetching Invoices...");
      const res = await this.makeApiRequest(this.config.booksApiUrl!, "invoices");
      return res.invoices || [];
    } catch (err) {
      console.error("[Zoho Books] Failed to fetch Invoices:", err);
      return [];
    }
  }

  /**
   * Fetches records from a Zoho Creator Report
   */
  public async getCreatorRecords(reportLinkName: string): Promise<any[]> {
    if (!this.hasCredentials()) return [];
    try {
      console.log("[Zoho Creator] Fetching report records for:", reportLinkName);
      const owner = this.config.creatorOwner;
      const app = this.config.creatorAppName;
      const endpoint = `${owner}/${app}/report/${reportLinkName}`;
      const res = await this.makeApiRequest(this.config.creatorApiUrl!, endpoint);
      return res.data || [];
    } catch (err) {
      console.error("[Zoho Creator] Failed to fetch Creator records:", err);
      return [];
    }
  }
}

export const zohoService = ZohoIntegrationService.getInstance();

