export class ScreenerDto {
    created: number;
    user: string;
    constructor(readonly questions: any[]) {
        this.user = 'default';
        this.created = Date.now();
    }
}