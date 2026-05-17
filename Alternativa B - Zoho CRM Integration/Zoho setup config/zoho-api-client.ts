/**
 * ðŸš€ Zoho CRM API Client (Server-Side)
 * 
 * Used by the Buyer Portal (Ecommerce) to "enrich" Zoho CRM.
 * This client handles OAuth 2.0 authentication and communicates with
 * the Zoho CRM REST API from the server.
 */

export interface ZohoConfig {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  accountsUrl: string; // e.g., 'https://accounts.zoho.com'
  apiUrl: string;      // e.g., 'https://www.zohoapis.com/crm/v2'
}

export class ZohoAPIClient {
  private config: ZohoConfig;
  private accessToken: string | null = null;

  constructor(config: ZohoConfig) {
    this.config = config;
  }

  /**
   * Refreshes the OAuth access token.
   * Ideally, this should be cached in a database or Redis.
   */
  private async refreshAccessToken(): Promise<string> {
    const url = `${this.config.accountsUrl}/oauth/v2/token?refresh_token=${this.config.refreshToken}&client_id=${this.config.clientId}&client_secret=${this.config.clientSecret}&grant_type=refresh_token`;
    
    const response = await fetch(url, { method: 'POST' });
    const data = await response.json();
    
    if (data.access_token) {
      this.accessToken = data.access_token;
      return data.access_token;
    }
    
    throw new Error("Failed to refresh Zoho access token: " + JSON.stringify(data));
  }

  /**
   * Makes a generic request to Zoho CRM API.
   */
  public async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    if (!this.accessToken) {
      await this.refreshAccessToken();
    }

    const url = `${this.config.apiUrl}/${endpoint}`;
    const headers = {
      ...options.headers,
      'Authorization': `Zoho-oauthtoken ${this.accessToken}`,
      'Content-Type': 'application/json',
    };

    let response = await fetch(url, { ...options, headers });

    // Handle token expiration (401)
    if (response.status === 401) {
      await this.refreshAccessToken();
      headers['Authorization'] = `Zoho-oauthtoken ${this.accessToken}`;
      response = await fetch(url, { ...options, headers });
    }

    return response.json();
  }

  /**
   * Enriches Zoho CRM by creating a Sales Order from a La Cañada Seafood order.
   */
  public async createSalesOrder(orderData: any): Promise<any> {
    return this.request('Sales_Orders', {
      method: 'POST',
      body: JSON.stringify({
        data: [orderData]
      })
    });
  }

  /**
   * Syncs a new customer from the Buyer Portal to Zoho Contacts.
   */
  public async syncContact(contactData: any): Promise<any> {
    return this.request('Contacts', {
      method: 'POST',
      body: JSON.stringify({
        data: [contactData]
      })
    });
  }
}

// Example usage in an API Route:
// const zoho = new ZohoAPIClient({ ... });
// await zoho.createSalesOrder(myOrder);
