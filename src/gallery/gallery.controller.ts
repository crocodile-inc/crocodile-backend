import { Controller, Get } from '@nestjs/common';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get('unraveled')
  async getUnraveled() {
    return await this.galleryService.getUnraveled();
  }
}
