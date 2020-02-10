import { Injectable } from '@nestjs/common';
import { FeedbackDto } from './feedback.dto';
import { Client } from "elasticsearch";
import { ClientService } from "../db.elasticsearch/client.service"
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromPromise"
import "rxjs/add/operator/map"
import "rxjs/add/operator/do"

@Injectable()
export class FeedbackService {
    private readonly INDEX = "feedback";
    private readonly TYPE = "user_facing";
    private client: Client;
    private readonly baseParams = {
        index: this.INDEX,
        type: this.TYPE
    };

    constructor(
        private readonly clientService: ClientService
    ) {
        this.client = this.clientService.client;
    }

    sendFeedback(feedback: FeedbackDto): Observable<FeedbackDto> {
        return Observable.fromPromise(this.clientService.index(feedback, this.INDEX, this.TYPE, "1"));
    }
}
