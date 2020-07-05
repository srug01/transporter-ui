export interface Notification {
    notificationId?: number;
    notificationType?: string;
    notificationDesc?: string;
    orderId?: number;
    createdBy?: number;
    createdOn?: Date;
    isRead?: boolean;
    assignToRole?: number;
    assignToUser?: number;
}