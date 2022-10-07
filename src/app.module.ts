import { Module } from '@nestjs/common';
import { EventsModule } from 'events/events.module';
import { PrismaModule } from 'prisma/prisma.module';
import { GalleryModule } from 'gallery/gallery.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'dist', 'public'),
      exclude: ['/api*'],
    }),
    PrismaModule,
    EventsModule,
    GalleryModule,
  ],
})
export class AppModule {}
