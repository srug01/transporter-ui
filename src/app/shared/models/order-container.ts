export interface OrderContainer {
    orderId: number;
    container_type: number;
    weight_type: number;
    no_of_trucks: number;
    is_delete: boolean;
    created_by: number;
    created_on: Date;
    modify_by: number;
    modify_on: Date;
    trucks: Array<any>;
    // order_container_numbers: Array<any>;
}
