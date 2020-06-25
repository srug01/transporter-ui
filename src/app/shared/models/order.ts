export interface Order {
    order_type_syscode: number;
    order_date: Date;
    source_syscode: number;
    source_type: string;
    destination_syscode: number;
    destination_type: string;
    order_remarks: string;
    order_address: string;
    is_delete: boolean;
    created_by: number;
    created_on: Date;
    modify_by: number;
    modify_on: Date;
    master_type_syscode: number;
    containers: Array<any>;
    is_verified: boolean;
    status: string;
}
