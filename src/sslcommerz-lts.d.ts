declare module 'sslcommerz-lts' {
    export default class SSLCommerzPayment {
      constructor(store_id: string, store_passwd: string, is_live: boolean);
  
      init(data: any): Promise<any>;
      validate(data: any): Promise<any>;
      initiateRefund(data: any): Promise<any>;
      refundQuery(data: any): Promise<any>;
      transactionQueryByTransactionId(data: any): Promise<any>;
      transactionQueryBySessionId(data: any): Promise<any>;
    }
  }
  