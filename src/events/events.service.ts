import { Injectable } from '@nestjs/common';
import { Guess, Picture, Room, Stroke } from './events.interfaces';
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
        guesses: true,
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

  async handleGuessToRoom(id: Room['id'], author: Guess['author'], guess: Guess['guess']) {
    const newGuess = await this.prismaService.guess.create({
      data: {
        roomId: id,
        author,
        guess,
      },
    });
    const room = await this.prismaService.room.findUnique({ where: { id } });
    if (!room.unraveled && room.riddle.toLowerCase() === newGuess.guess.toLowerCase()) {
      await this.prismaService.room.update({ where: { id }, data: { unraveled: true } });
      const victoriousGuess = await this.prismaService.guess.update({
        where: { id: newGuess.id },
        data: { victorious: true },
      });
      return [victoriousGuess, room.riddle] as const;
    } else {
      return [newGuess, undefined] as const;
    }
  }
}
