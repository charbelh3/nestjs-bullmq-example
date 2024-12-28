import {
  QueueEventsListener,
  OnQueueEvent,
  QueueEventsHost,
} from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';

@QueueEventsListener('video')
export class VideoQueueEventsListener extends QueueEventsHost {
  logger = new Logger('Queue');

  @OnQueueEvent('added')
  onAdded(job: { jobId: string; name: string }) {
    this.logger.log(`Job ${job.jobId} has been added to the queue`);
  }
}
