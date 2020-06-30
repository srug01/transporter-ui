export interface Notification {
    notificationId?: number;
    notificationType?: string;
    notificationDesc?: string;
    orderId?: string;
    createdBy?: number;
    createdOn?: Date;
    isRead?: boolean;
    assignToRole?: number;
    assignToUser?: number;
}