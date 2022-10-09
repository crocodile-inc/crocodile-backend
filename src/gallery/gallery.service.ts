import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { createCanvas } from 'canvas';
import { canvasSizes } from '../events/events.constants';
import { Room } from 'interfaces';
import { drawStroke } from './gallery.utils';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class GalleryService implements OnModuleInit {
  constructor(private readonly prismaService: PrismaService) {}

  async onModuleInit() {
    await this.initPictures();
  }

  async saveToGallery(id: Room['id']) {
    const picture = await this.prismaService.picture.findUnique({
      where: { roomId: id },
      include: { strokes: { include: { points: true } } },
    });
    const canvas = createCanvas(canvasSizes.width, canvasSizes.height);
    const context = canvas.getContext('2d');
    context.fillStyle = picture.backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    for (const stroke of picture.strokes) {
      drawStroke(context, stroke);
    }
    const buffer = canvas.toBuffer('image/png');
    const dir = join(__dirname, '..', 'public', 'gallery');
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(`${dir}/${id}.png`, buffer);
  }

  async initPictures() {
    const arrayOfUnraveled = (
      await this.prismaService.room.findMany({
        where: { unraveled: true },
      })
    ).map(room => room.id);
    for (const id of arrayOfUnraveled) {
      await this.saveToGallery(id);
    }
  }

  async getUnraveled() {
    const unraveledRooms = await this.prismaService.room.findMany({
      where: { unraveled: true },
      orderBy: { picture: { id: 'desc' } },
      include: {
        picture: {
          include: { strokes: true },
        },
      },
    });
    return unraveledRooms.map(room => ({
      id: room.id,
      answer: room.riddle,
      bigSize: room.picture.strokes.length > 50,
    }));
  }
}
