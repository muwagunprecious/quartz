"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useDelivery } from '@/context/DeliveryContext';
import Button from '@/components/common/Button';
import { Send, Phone, ArrowLeft, MoreVertical } from 'lucide-react';
import Link from 'next/link';

interface Message {
    id: string;
    text: string;
    senderId: string;
    senderName: string;
    timestamp: string;
}

export default function DeliveryChatPage() {
    const params = useParams();
    const deliveryId = params.id as string;
    const { user } = useAuth();
    const { socket } = useDelivery();

    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (socket && deliveryId) {
            // Join Room
            socket.emit('join_delivery', { deliveryId });

            // Listen for messages
            socket.on('new_message', (msg: Message) => {
                setMessages(prev => [...prev, msg]);
            });

            return () => {
                socket.off('new_message');
            };
        }
    }, [socket, deliveryId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim() || !socket || !user) return;

        socket.emit('send_message', {
            deliveryId,
            text: inputText,
            senderName: user.name,
            senderId: user.id
        });

        setInputText('');
    };

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col max-w-[600px] mx-auto shadow-2xl mobile-view-container relative">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <Link href="/delivery/dashboard" className="text-gray-500 hover:text-gray-800">
                        <ArrowLeft size={20} />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                            M
                        </div>
                        <div>
                            <h2 className="font-bold text-gray-900 text-sm">MartGo Delivery</h2>
                            <p className="text-xs text-green-500 flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                Active Order
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <a href="tel:08123456789" className="p-2 text-gray-400 hover:bg-gray-50 rounded-full">
                        <Phone size={20} />
                    </a>
                    <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-full">
                        <MoreVertical size={20} />
                    </button>
                </div>
            </header>

            {/* Messages Area */}
            <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-[#e5ddd5]/10 bg-chat-pattern">
                {messages.length === 0 && (
                    <div className="text-center text-gray-400 text-xs py-10">
                        <p>Start conversation with your rider/customer.</p>
                        <p>Messages are end-to-end encrypted.</p>
                    </div>
                )}

                {messages.map((msg) => {
                    const isMe = msg.senderId === user?.id;
                    return (
                        <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${isMe
                                    ? 'bg-primary text-white rounded-br-none'
                                    : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none shadow-sm'
                                }`}>
                                {!isMe && <p className="text-[10px] font-bold opacity-70 mb-0.5">{msg.senderName}</p>}
                                <p className="text-sm">{msg.text}</p>
                                <span className={`text-[10px] block text-right mt-1 ${isMe ? 'text-white/70' : 'text-gray-400'}`}>
                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={sendMessage} className="bg-white p-3 border-t border-gray-200 flex items-center gap-2 sticky bottom-0">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-grow bg-gray-100 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="bg-primary text-white p-2.5 rounded-full hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Send size={18} />
                </button>
            </form>
        </main>
    );
}
