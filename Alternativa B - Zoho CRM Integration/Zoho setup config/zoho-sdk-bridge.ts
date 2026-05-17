/**
 * ðŸ§© Zoho CRM SDK Bridge
 * 
 * Provides a type-safe abstraction for interacting with Zoho CRM.
 * This bridge ensures La Cañada Seafood logic remains decoupled from the
 * specific Zoho SDK syntax.
 */

export interface ZohoRecord {
  id: string;
  [key: string]: any;
}

export class ZohoSDKBridge {
  private static instance: ZohoSDKBridge;
  private isInitialized: boolean = false;

  private constructor() {}

  public static getInstance(): ZohoSDKBridge {
    if (!ZohoSDKBridge.instance) {
      ZohoSDKBridge.instance = new ZohoSDKBridge();
    }
    return ZohoSDKBridge.instance;
  }

  /**
   * Initializes the Zoho Embedded App SDK.
   * Must be called inside a useEffect in the root layout.
   */
  public async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') return resolve();
      
      const ZOHO = (window as any).ZOHO;
      if (!ZOHO) {
        console.error("Zoho SDK script not found in document.");
        return reject("SDK_NOT_FOUND");
      }

      ZOHO.embeddedApp.on("PageLoad", (data: any) => {
        console.log("La Cañada Seafood Widget Loaded:", data);
        this.isInitialized = true;
        resolve();
      });

      ZOHO.embeddedApp.init();
    });
  }

  /**
   * Fetches a list of records from a Zoho Module.
   * @param entity The module name (e.g., 'Products', 'Contacts')
   */
  public async getRecords(entity: string): Promise<ZohoRecord[]> {
    const ZOHO = (window as any).ZOHO;
    const response = await ZOHO.CRM.API.getAllRecords({ Entity: entity });
    return response.data || [];
  }

  /**
   * Gets details for a specific record.
   */
  public async getRecordById(entity: string, id: string): Promise<ZohoRecord | null> {
    const ZOHO = (window as any).ZOHO;
    const response = await ZOHO.CRM.API.getRecord({ Entity: entity, RecordID: id });
    return response.data?.[0] || null;
  }

  /**
   * Updates or creates a record.
   */
  public async upsertRecord(entity: string, data: Partial<ZohoRecord>): Promise<any> {
    const ZOHO = (window as any).ZOHO;
    const config = data.id 
      ? { Entity: entity, APIData: data, Trigger: ["workflow"] }
      : { Entity: entity, APIData: data };
      
    return data.id 
      ? ZOHO.CRM.API.updateRecord(config)
      : ZOHO.CRM.API.insertRecord(config);
  }
}

export const zohoBridge = ZohoSDKBridge.getInstance();
