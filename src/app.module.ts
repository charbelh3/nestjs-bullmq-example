import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { BullModule } from '@nestjs/bullmq';
import { VideoProcessor } from './video.worker';
import { VideoQueueEventsListener } from './video-queue.events';

/**
 * STEP 1 : Install @nestjs/bullmq and bullmq
 * STEP 2: Register Bull Module and specify redis server credentials
 * STEP 3: Register a Bull Queue
 * STEP 4: Send jobs to the queue
 * STEP 5: Setup a worker to consume and process jobs
 */

@Module({
  imports: [
    BullModule.forRoot({
      connection: { host: 'localhost', port: 6379 },
      defaultJobOptions: {
        attempts: 3, // Max number of attempts for failed jobs
        removeOnComplete: 1000, // Keep data for the last 1000 completed jobs
        removeOnFail: 3000, // Keep data for the last 3000 failed jobs
        backoff: 2000, // Wait at least 2 seconds before attempting the job again, after failure
      },
    }),
    BullModule.registerQueue({ name: 'video' }),
  ],
  controllers: [VideoController],
  providers: [VideoProcessor, VideoQueueEventsListener],
})
export class AppModule {}
