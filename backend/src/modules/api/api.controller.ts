import { Get, Controller, Param, Body, Post } from '@nestjs/common';
import { Observable } from "rxjs/Observable"
import { ProgramService } from "../Program/program.service";
import { ScreenerService } from "../screener/screener.service"
import { ProgramDto } from "../Program/program.dto";
import { PercolateService } from "../percolate/percolate.service";
import { PageService } from "../page/page.service"
import { PageDto } from '../page/page.dto';
import { FeedbackService } from "../feedback/feedback.service"
import { FeedbackDto } from '../feedback/feedback.dto';

@Controller('api')
export class ApiController {
    constructor(
        private programService: ProgramService,
        private screenerService: ScreenerService,
        private percolateService: PercolateService,
        private pageService: PageService,
        private feedbackService: FeedbackService,
    ) {}

    @Get('screener')
    getScreener(): Observable<any> {
        return this.screenerService.getLatest();
    }

    @Get('program')
    getAllUserPrograms(): Observable<ProgramDto[]> {
        return this.programService.findAll();
    }

    @Get('program/:guid')
    getProgramByGuid(@Param() params): Promise<ProgramDto> {
        return this.programService.getByGuid(params.guid);
    }

    @Get('page/:title')
    getPageByTitle(@Param() params): Observable<PageDto>{
        return this.pageService.getByTitle(params.title);
    }

    @Post('notification')
    getProgramsFromForm(@Body() body): Observable<ProgramDto[]> {
        return this.percolateService.precolate(body);
    }

    @Post('feedback')
    sendFeedback(@Body() body): Observable<FeedbackDto> {
        return this.feedbackService.sendFeedback(body);
    }
}