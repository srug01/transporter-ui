
export interface Bid {
    bidId?: number;
    bidName: string;
    containerId: number;
    container_type: number;
    container_weight_type: number;
    source_type: string;
    destination_type: string;
    original_rate?: number;
    exhibition_date?: string;
    orderId: number;
    is_active: boolean;
    created_by: number;
    created_on: string;
    modified_by?: number;
    modified_on?: string;
    bid_upper_limit?: number;
    bid_lower_limit?: number;
    order_master_type_syscode?: number;
    source_name?: string;
    destination_name?: string;
    bid_rate?: number;
    bid_value?: number;
    margin_percent?: number;
}
