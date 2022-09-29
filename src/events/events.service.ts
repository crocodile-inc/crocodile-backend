import { Injectable } from '@nestjs/common';
import { Picture, Room, Stroke } from './events.interfaces';
import { nanoid } from 'nanoid';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createNewRoom(riddle: Room['riddle'], backgroundColor: Picture['backgroundColor']) {
    const id = nanoid();
    const room = await this.prismaService.room.create({
      data: {
        id,
        riddle,
        picture: {
          create: {
            backgroundColor,
          },
        },
      },
    });
    return room.id;
  }

  async getRoomById(id: Room['id']) {
    return await this.prismaService.room.findUnique({
      where: { id },
      include: {
        picture: {
          include: {
            strokes: {
              include: { points: true },
            },
          },
        },
      },
    });
  }

  async addStrokeToPictureInRoom(id: Room['id'], stroke: Stroke) {
    return await this.prismaService.picture.update({
      where: { roomId: id },
      data: {
        strokes: {
          create: {
            strokeWidth: stroke.strokeWidth,
            strokeColor: stroke.strokeColor,
            points: {
              createMany: {
                data: stroke.points,
              },
            },
          },
        },
      },
    });
  }

  async updateBackgroundColorInRoom(id: Room['id'], backgroundColor: Picture['backgroundColor']) {
    return await this.prismaService.picture.update({
      where: { roomId: id },
      data: {
        backgroundColor,
      },
    });
  }

  async clearPictureInRoom(id: Room['id']) {
    return await this.prismaService.picture.update({
      where: { roomId: id },
      data: { strokes: { deleteMany: {} } },
      include: {
        strokes: true,
      },
    });
  }
}
