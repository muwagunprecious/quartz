export type DeliveryStatus = 'available' | 'negotiating' | 'ongoing' | 'completed';
export type DeliveryStage = 'picked_up' | 'on_way' | 'at_gate' | 'delivered';

export interface DeliveryOrder {
    id: string;
    // ... existing fields ...
    buyerName: string;
    // ...
    price: number;
    negotiatedPrice?: number; // If rider proposes new price
    status: DeliveryStatus;

    verificationCode: string;
    deliveryStage: DeliveryStage;
    timestamps: {
        created?: string;
        accepted_by_rider?: string;
        confirmed_by_buyer?: string;
        picked_up?: string;
        on_way?: string;
        at_gate?: string;
        delivered?: string;
    };
}
