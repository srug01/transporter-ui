export interface subOrder {
  ['SubOrder ID']: number;
  ['orderId']: number;
  ['subOrderTotal']: number;
  ['CutOffTime']: string;
  containerMasterName: string;
  weightDesc: string;
  suborderStatus: string;

}

export interface Bid {
  ['Bid ID']?: number;
  bidName?: string;
  bidValue?: number;
  biduserStatus?: string;
  bidStatus?: string;
  bidId?: number;
  bidRate? : number;
}

export interface KidRecord {
  data?: Bid;
  kids?: KidRecord;
}

export interface OrderRecord {
  data?: subOrder;
  kids?: {
    has_bids?: {
      records: KidRecord;
    }
  }
}

export interface OrderData {
  ['orderId']: number;
  Source: string;
  Destination: string;
  OrderDate: string;
  OrderTotal: number;
  Remarks: string;
  orderStatus: string;

}


export interface Order {
  data: OrderData;
  kids: {
    has_suborders?: {
      records: OrderRecord[];
    }
  };
}
