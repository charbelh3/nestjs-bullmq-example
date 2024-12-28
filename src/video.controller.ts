import { InjectQueue } from '@nestjs/bullmq';
import { Controller, Post, Body } from '@nestjs/common';
import { Queue } from 'bullmq';

@Controller('video')
export class VideoController {
  constructor(@InjectQueue('video') private readonly videoQueue: Queue) {}

  @Post('process')
  async processVideo() {
    await this.videoQueue.add(
      'process',
      {
        fileName: 'best-video',
        fileType: 'mp4',
      },
      { delay: 5000 },
    );
    return {
      message: 'Video processing job added to queue!',
    };
  }

  @Post('compress')
  async compressVideo() {
    await this.videoQueue.add('compress', {
      fileName: 'best-video',
      fileType: 'mp4',
    });
    return {
      message: 'Video compressing job added to queue!',
    };
  }
}
