import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';
import { GalleryService } from 'gallery/gallery.service';

@Module({
  providers: [EventsGateway, EventsService, GalleryService],
})
export class EventsModule {}
