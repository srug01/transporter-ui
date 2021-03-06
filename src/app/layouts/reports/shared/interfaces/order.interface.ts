export interface subOrder {
  ['SubOrder ID']: number;
  ['orderId']: number;
  ['subOrderTotal']: number;
  ['CutOffTime']: string;
  containerMasterName: string;
  subOrderSeq: string;
  weightDesc: string;
  suborderStatus: string;

}

export interface Bid {
  ['Bid ID']: number;
  bidSeq: string;
  bidValue: number;
  biduserStatus: string;
  bidStatus: string;
}

export interface Trip {
  subOrderId: number;
  tripstatus: string;
  tripId: number;
  transporterName: string;
  transporterContainer: string;
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
