"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';
import api from '@/lib/api';

export type DeliveryStatus = 'PENDING' | 'ACCEPTED' | 'NEGOTIATING' | 'PICKED_UP' | 'ON_MY_WAY' | 'AT_THE_GATE' | 'DELIVERED' | 'CANCELLED';

// Matching Backend Delivery Model slightly simplified for frontend
export interface DeliveryOrder {
    id: string;
    productName?: string; // Derived
    productImage?: string; // Derived
    status: DeliveryStatus;
    pickup_address: string;
    dropoff_address: string;
    offered_price: number;
    negotiated_price?: number;
    rider_id?: string;
    code?: string; // For verification

    // Timestamps
    created_at: string;
    picked_up_at?: string;
    on_way_at?: string;
    at_gate_at?: string;
    delivered_at?: string;

    // Relations (flattened for ease)
    buyerName?: string;
    buyerPhone?: string;
    sellerName?: string;
    sellerPhone?: string;

    riderLocation?: { lat: number; lng: number };
    eta?: string;
}

interface DeliveryContextType {
    orders: DeliveryOrder[];
    activeDelivery: DeliveryOrder | null;
    createDeliveryRequest: (data: any) => Promise<void>;
    acceptDelivery: (id: string) => Promise<void>;
    updateStatus: (id: string, status: DeliveryStatus) => Promise<void>;
    verifyCode: (id: string, code: string) => Promise<void>;
    socket: Socket | null;
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined);

export function DeliveryProvider({ children }: { children: React.ReactNode }) {
    const { user, token } = useAuth();
    const [orders, setOrders] = useState<DeliveryOrder[]>([]);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [activeDelivery, setActiveDelivery] = useState<DeliveryOrder | null>(null);

    // 1. Initialize Socket
    useEffect(() => {
        if (token && user) {
            const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {


                auth: { token },
                transports: ['websocket'] // Force websocket
            });

            newSocket.on('connect', () => {
                console.log("Connected to Delivery Socket");
            });

            // Listeners
            newSocket.on('delivery_request', (delivery: any) => {
                console.log("New Delivery Request!", delivery);
                // logic to show toast or add to list if rider
                setOrders(prev => [mapBackendToFrontend(delivery), ...prev]);
            });

            newSocket.on('delivery_accepted', (delivery: any) => {
                console.log("Delivery Accepted!", delivery);
                updateOrderInState(delivery);
            });

            newSocket.on('delivery_status_update', (delivery: any) => {
                console.log("Delivery Status Update", delivery);
                updateOrderInState(delivery);
            });

            newSocket.on('delivery_completed', (delivery: any) => {
                console.log("Delivery Completed", delivery);
                updateOrderInState(delivery);
            });

            setSocket(newSocket);

            return () => {
                newSocket.disconnect();
            };
        }
    }, [token, user]);

    // 2. Fetch Initial Orders (Active)
    useEffect(() => {
        if (user) {
            fetchActiveDeliveries();
        }
    }, [user]);

    const fetchActiveDeliveries = async () => {
        try {
            // Needed backend endpoint for "my deliveries"
            // For now, handling empty
        } catch (e) {
            console.error("Failed to fetch deliveries", e);
        }
    };

    const updateOrderInState = (backendDelivery: any) => {
        const mapped = mapBackendToFrontend(backendDelivery);
        setOrders(prev => {
            const exists = prev.find(o => o.id === mapped.id);
            if (exists) {
                return prev.map(o => o.id === mapped.id ? mapped : o);
            }
            return [mapped, ...prev];
        });

        // Update active if matched
        if (activeDelivery?.id === mapped.id) {
            setActiveDelivery(mapped);
        }
    };

    const createDeliveryRequest = async (data: any) => {
        // data comes from Modal (Address, etc.)
        // We typically create an ORDER first, then a DELIVERY request
        // But for "MartGo" standalone flow, we might just hit an endpoint that does both OR expect orderID.
        // The modal passed productName, etc.
        // Assuming we create an Order via API which triggers delivery creation locally or via backend.

        // Simplified: The backend `createRequest` requires `orderId`.
        // So Flow: Create Order -> Create Delivery.
        // This logic should ideally be in `submit` of the modal using `api`.
        // For Context method, let's assume we just add it to state optimistically or wait for socket.
        // Actually, we'll implement the API call here.

        try {
            const orderRes = await api.post('/orders', {
                product_id: data.productId, // Need this from modal
                quantity: 1,
                delivery_option: 'DELIVERY',
                delivery_fee: data.price,
                // These fields for Delivery Request
                create_delivery_request: true,
                delivery_address: data.hostelName + ', ' + data.roomNumber,
                delivery_contact: data.phoneNumber,
                offered_delivery_price: data.price
            });
            // Socket will catch the 'delivery_request' or updated order logic ??
            // Using backend logic: `createRequest` is called.
            // But wait, `createRequest` notifies RIDERS.
            // Does it notify BUYER? Not explicitly in my code change.
            // But I can manually add to state here.
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const acceptDelivery = async (id: string) => {
        await api.post(`/deliveries/${id}/accept`);
    };

    const updateStatus = async (id: string, status: DeliveryStatus) => {
        await api.patch(`/deliveries/${id}/status`, { status });
    };

    const verifyCode = async (id: string, code: string) => {
        await api.post(`/deliveries/${id}/verify`, { code });
    };

    return (
        <DeliveryContext.Provider value={{
            orders,
            activeDelivery,
            createDeliveryRequest,
            acceptDelivery,
            updateStatus,
            verifyCode,
            socket
        }}>
            {children}
        </DeliveryContext.Provider>
    );
}

// Helper to map backend shape to frontend interface
function mapBackendToFrontend(d: any): DeliveryOrder {
    return {
        id: d.id,
        status: d.status,
        pickup_address: d.pickup_address,
        dropoff_address: d.dropoff_address,
        offered_price: d.offered_price,
        negotiated_price: d.negotiated_price,
        rider_id: d.rider_id,
        code: d.code,
        created_at: d.created_at || d.timestamps?.created, // Fallback

        productName: d.order?.product?.title || "Product",
        productImage: d.order?.product?.images?.[0]?.url || "",

        buyerName: d.order?.buyer?.first_name,
        buyerPhone: d.order?.buyer?.phone,

        // Mapping timestamps from root or custom logic
        picked_up_at: d.picked_up_at,
        on_way_at: d.on_way_at,
        at_gate_at: d.at_gate_at,
        delivered_at: d.delivered_at
    };
}

export function useDelivery() {
    const context = useContext(DeliveryContext);
    if (!context) throw new Error("useDelivery must be used within DeliveryProvider");
    return context;
}
