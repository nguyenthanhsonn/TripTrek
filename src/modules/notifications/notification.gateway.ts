import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import {
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
    cors: { origin: "*" },
    namespace: "/notification",
})
export class NotificationGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer() server: Server;

    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {}

    afterInit(server: Server) {
        server.use(async (socket: Socket, next) => {
            const token = socket.handshake.auth.token;

            if (!token) return next(new Error("Unauthorized"));

            try {
                const decoded = await this.jwtService.verifyAsync(token, {
                    secret: this.configService.get("JWT_SECRET"),
                });

                socket.data.user = decoded;
                next();
            } catch (err) {
                next(new Error("Unauthorized"));
            }
        });
    }

    handleConnection(client: Socket) {
        const user = client.data.user;

        if (!user) return;

        const userRoom = `user_${user.id}`;
        client.join(userRoom);

        if (user.is_admin === true) {
            client.join("admin_room");
        }
    }

    @SubscribeMessage("join-admin-room")
    handleAdminJoin(@ConnectedSocket() client: Socket) {
        client.join("admin_room");
    }

    handleDisconnect(client: Socket) {}

    sendToUser(userId: number, notification: any) {
        const room = `user_${userId}`;

        const payload = {
            id: notification.id,
            typeNoti: notification.typeNoti,
            title: notification.title,
            message: notification.message,
            isRead: notification.isRead ?? false,
            createdAt: notification.createdAt,
            tourId: notification.tourId ?? null,
            bookingId: notification.bookingId ?? null,
        };

        this.server.to(room).emit("new-notification", payload);
    }

    sendToAdmin(notification: any) {
        const payload = {
            id: notification.id,
            typeNoti: notification.typeNoti,
            title: notification.title,
            message: notification.message,
            isRead: notification.isRead ?? false,
            createdAt: notification.createdAt,
            tourId: notification.tourId ?? null,
            bookingId: notification.bookingId ?? null,
        };

        this.server.to("admin_room").emit("new-notification-admin", payload);
    }
}
