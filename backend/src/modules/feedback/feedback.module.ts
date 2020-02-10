import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { DbElasticsearchModule } from "../db.elasticsearch/db.elasticsearch.module"

@Module({
  imports: [ DbElasticsearchModule ],
  providers: [FeedbackService],
  exports: [ FeedbackService ]
})
export class FeedbackModule {}