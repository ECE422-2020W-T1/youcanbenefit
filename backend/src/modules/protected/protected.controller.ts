import { Get, Controller, Param, Body, Post, Put, Delete, Req } from '@nestjs/common';
import { Observable } from "rxjs/Observable"
import { ProgramService } from "../Program/program.service";
import { ApplicationProgramDto } from "./AplicationProgram.dto";
import { ApplicationQueryService } from "../query/ApplicationQuery.service";
import { ApplicationQueryDto } from "../query/ApplicationQuery.dto"
import "rxjs/add/observable/fromPromise"
import "rxjs/add/observable/from"
import "rxjs/add/operator/map"
import "rxjs/add/observable/zip"
import "rxjs/add/operator/mergeMap"
import "rxjs/add/observable/throw"
import "rxjs/add/observable/of"
import "rxjs/add/operator/catch"
import { QuestionService } from '../question/question.service';
import { QuestionDto } from '../question/question.dto';
import {ScreenerDto} from "../screener/screener.dto";
import {ScreenerService} from "../screener/screener.service";
import { PageService } from '../page/page.service';
const fs = require('fs');
const path = require('path');


@Controller('protected')
export class ProtectedController {
    constructor(
        private programService: ProgramService,
        private queryService: ApplicationQueryService,
        private questionService: QuestionService,
        private screenerService: ScreenerService,
        private pageService: PageService
    ) {}

    @Get('/login/')
    loginAlwaysTrue(): Observable<{[key: string]: boolean}> {
        return Observable.of({created: true})
    }

    @Get('/question/')
    getQuestions(): Observable<QuestionDto[]> {
        return this.questionService.getQuestions();
    }

    @Get('/screener/')
    getScreenerWithQuestions(): Observable<any> {
        return Observable.zip(
            this.screenerService.getLatest(),
        ).map( ([screener]) => {
            return {
                ...screener
            }
        })
    }

    @Post('/screener/')
    saveScreener(@Body() data) {
        // console.log(data);
        return Observable.zip(
            this.screenerService.update((<ScreenerDto> data)),
            this.questionService.updateQuestions(data['questions'])
        ).map(([screener, questions]) => {
            return {screener, questions}
        })
    }

    @Get('/program/')
    getProgramsWithQueries(): Observable<ApplicationProgramDto[]> {
        return Observable.zip(
            this.programService.findAll(),
            this.queryService.findAll()
        ).map(([programs, queries]) => {
            return programs.map( program => {
                return new ApplicationProgramDto(
                    queries.filter(query => query.guid === program.guid),
                    program,
                    program.guid,
                );
            })
        })
    }

    @Get('/program/:guid')
    getProgramWithQueries(@Param() params): Observable<ApplicationProgramDto> {
        const guid = params.guid;
        return Observable.zip(
            this.programService.getByGuid(guid),
            this.queryService.getByGuid(guid)
        ).map( ([program, queries]) => {
            return new ApplicationProgramDto(
                queries,
                program,
                program.guid
            )
        })
            .catch(err => {
                console.error(err);
                return Observable.throw(err);
            })

    }

    @Delete('/program/:guid')
    deleteProgramAndQueries(@Param() params): Observable<any> {
        const guid = params.guid;

        return Observable.zip(
            this.programService.deleteByGuid(guid),
            this.queryService.deleteByGuid(guid)
        )
        .map(([programDeleted, queriesDeleted]) => ({...programDeleted, ...queriesDeleted}))
    }

    @Delete('/query/:id')
    deleteQueryById(@Param() params): Observable<any> {
        return this.queryService.deleteById(params.id)
            .map(res => res.deleted ? {found: true, deleted: true } : { found: null, deleted: false} )
    }

    @Post('/query/')
    updateOrCreateQuery(@Body("query") query, @Body("guid") guid): Promise<any> {
        return this.queryService.index({
            ...query,
            guid
        })
    }

    @Put('/program-description/')
    updateUserFacingProgram(@Body() data): Promise<any> {
        return this.programService.index(data)
    }

    @Post('/page/')
    createOrUpdatePage(@Body() body): Promise<any>{
        return this.pageService.createOrUpdate(body);
    }
}
