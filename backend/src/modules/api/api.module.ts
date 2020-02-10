import { Module } from '@nestjs/common';
import { ProgramModule } from '../Program'
import { ApiController } from "./api.controller";
import { ScreenerModule } from "../screener";
import { PercolateModule } from "../percolate/percolate.module";
import { PageModule } from "../page/page.module";
import { FeedbackModule } from "../feedback/feedback.module";

@Module({
    imports: [
        ProgramModule,
        ScreenerModule,
        PercolateModule,
        PageModule,
        FeedbackModule
    ],
    controllers: [ ApiController ]
})
export class ApiModule {}
