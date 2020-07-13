export interface Notification {
    notificationId?: number;
    notificationType?: string;
    notificationDesc?: string;
    orderId: number;
    bidId?: number;
    createdBy?: number;
    createdOn?: Date;
    isRead?: boolean;
    assignedToRole?: number;
    assignedToUser?: number;
}