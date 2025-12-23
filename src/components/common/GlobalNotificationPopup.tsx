"use client";

import { useState, useEffect } from 'react';
import { X, Bell } from 'lucide-react';
import { io, Socket } from 'socket.io-client';

interface NotificationData {
    id: string;
    message: string;
    created_at: string;
}

export default function GlobalNotificationPopup() {
    const [notification, setNotification] = useState<NotificationData | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
            auth: { token }
        });

        newSocket.on('admin_notification', (data: NotificationData) => {
            setNotification(data);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    if (!notification) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-2xl animate-in zoom-in duration-300">
                <button
                    onClick={() => setNotification(null)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X size={24} />
                </button>

                <div className="text-center">
                    <div className="bg-deepblue/10 p-4 rounded-full inline-block mb-4">
                        <Bell size={40} className="text-deepblue" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Admin Notification</h3>
                    <p className="text-gray-600 mb-6 whitespace-pre-wrap">{notification.message}</p>
                    <button
                        onClick={() => setNotification(null)}
                        className="w-full bg-deepblue text-white py-2 rounded-lg font-medium hover:bg-deepblue/90 transition-colors"
                    >
                        Okay
                    </button>
                </div>
            </div>
        </div>
    );
}
