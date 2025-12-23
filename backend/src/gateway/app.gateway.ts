import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    constructor(private jwtService: JwtService) { }

    async handleConnection(client: Socket) {
        try {
            const token = client.handshake.auth.token || client.handshake.headers.authorization?.split(' ')[1];
            if (!token) {
                client.disconnect();
                return;
            }
            const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET || 'secretKey' });
            // Join room based on user ID
            client.join(`user:${payload.sub}`);

            // Join university room for all users (for notifications)
            if (payload.university_id) {
                client.join(`university:${payload.university_id}`);
            }

            // Join "all_users" room for global broadcasts
            client.join('all_users');

            // Role-based rooms
            if (payload.role === 'RIDER') {
                client.join(`rider:${payload.sub}`);
                client.join('all_riders');
                if (payload.university_id) {
                    client.join(`university:${payload.university_id}:riders`);
                }
            }

            if (payload.role === 'SELLER') {
                client.join('all_sellers');
            }
        } catch (e) {
            client.disconnect();
        }
    }

    handleDisconnect(client: Socket) {
        // cleanup
    }

    // Example method to emit event (called from Services)
    notifyUser(userId: string, event: string, data: any) {
        this.server.to(`user:${userId}`).emit(event, data);
    }

    notifyRiders(universityId: string, event: string, data: any) {
        this.server.to(`university:${universityId}:riders`).emit(event, data);
    }

    // Broadcast to all connected users
    notifyAllUsers(event: string, data: any) {
        this.server.to('all_users').emit(event, data);
    }

    // Broadcast to users in a specific university
    notifyUniversity(universityId: string, event: string, data: any) {
        this.server.to(`university:${universityId}`).emit(event, data);
    }

    @SubscribeMessage('join_delivery')
    handleJoinDelivery(@MessageBody() data: { deliveryId: string }, @ConnectedSocket() client: Socket) {
        client.join(`delivery:${data.deliveryId}`);
        return { event: 'joined_delivery', data: { deliveryId: data.deliveryId } };
    }

    @SubscribeMessage('send_message')
    handleSendMessage(@MessageBody() data: { deliveryId: string, text: string, senderName: string, senderId: string }, @ConnectedSocket() client: Socket) {
        // In real app, save to DB here (Message model)
        const messagePayload = {
            id: Math.random().toString(36).substr(2, 9),
            text: data.text,
            senderName: data.senderName,
            senderId: data.senderId,
            timestamp: new Date().toISOString(),
        };
        this.server.to(`delivery:${data.deliveryId}`).emit('new_message', messagePayload);
    }
}
