import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Picture, Room, Stroke } from './events.interfaces';
import { EventsService } from './events.service';
import { events } from './events.constants';

@WebSocketGateway({ cors: true })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly eventsService: EventsService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage(events.toServer.START_NEW_GAME)
  async startNewGame(
    @ConnectedSocket() socket: Socket,
    @MessageBody()
    {
      riddle,
      backgroundColor,
    }: { riddle: Room['riddle']; backgroundColor: Picture['backgroundColor'] },
  ) {
    const roomId = await this.eventsService.createNewRoom(riddle, backgroundColor);
    socket.join(roomId);
    socket.emit(events.fromServer.ROOM_ID_FROM_SERVER, roomId);
  }

  @SubscribeMessage(events.toServer.JOIN_THE_GAME)
  async joinTheGame(@ConnectedSocket() socket: Socket, @MessageBody() roomId: Room['id']) {
    const room = await this.eventsService.getRoomById(roomId);
    if (room !== null) {
      socket.join(roomId);
      if (room.picture?.strokes) {
        socket.emit(events.fromServer.INITIAL_PICTURE_FROM_SERVER, room.picture);
      } else {
        socket.emit(events.fromServer.INITIAL_PICTURE_FROM_SERVER, undefined);
      }
    }
  }

  @SubscribeMessage(events.toServer.STROKE_TO_SERVER)
  async strokeToServer(
    @ConnectedSocket() socket: Socket,
    @MessageBody() { roomId, stroke }: { roomId: Room['id']; stroke: Stroke },
  ) {
    await this.eventsService.addStrokeToPictureInRoom(roomId, stroke);
    this.server.to(roomId).except(socket.id).emit(events.fromServer.STROKE_FROM_SERVER, stroke);
  }

  @SubscribeMessage(events.toServer.BACKGROUND_COLOR_TO_SERVER)
  async backgroundColorToServer(
    @ConnectedSocket() socket: Socket,
    @MessageBody()
    {
      roomId,
      backgroundColor,
    }: { roomId: Room['id']; backgroundColor: Picture['backgroundColor'] },
  ) {
    await this.eventsService.updateBackgroundColorInRoom(roomId, backgroundColor);
    this.server
      .to(roomId)
      .except(socket.id)
      .emit(events.fromServer.BACKGROUND_COLOR_FROM_SERVER, backgroundColor);
  }

  @SubscribeMessage(events.toServer.CLEAR_TO_SERVER)
  async clear(@ConnectedSocket() socket: Socket, @MessageBody() roomId: Room['id']) {
    const picture = await this.eventsService.clearPictureInRoom(roomId);
    this.server.to(roomId).emit(events.fromServer.INITIAL_PICTURE_FROM_SERVER, picture);
  }

  handleConnection(socket: Socket) {
    console.log(`Client with id: ${socket.id} connected`);
  }

  handleDisconnect(socket: Socket) {
    console.log(`Client with id: ${socket.id} disconnected`);
  }
}
