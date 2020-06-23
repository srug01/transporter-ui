export interface Order {
    order_type_syscode: number;
    order_date: Date;
    source_syscode: number;
    source_type_syscode: number;
    destination_syscode: number;
    destination_type_syscode: number;
    order_remarks: string;
    order_address: string;
    is_delete: boolean;
    created_by: number;
    created_on: Date;
    modify_by: number;
    modify_on: Date;
    containers: Array<any>;
}
