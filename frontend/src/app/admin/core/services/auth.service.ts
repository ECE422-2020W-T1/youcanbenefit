import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { environment } from '../../../../environments/environment';

declare const btoa;

@Injectable()
export class AuthService {
    isLoggedIn: boolean =  !environment.production;
    private credentials: string;
    private username: string;
    // store the URL so we can redirect after logging in
    redirectUrl = 'admin/screener/edit';

    constructor(private http: Http){}

    login(user: string, password: string): Observable<boolean> {
        const auth = btoa(user + ":" + password);
        const headers = new Headers();
        headers.append("Authorization", "Basic " + auth);
        const options = new RequestOptions({ headers: headers });

        return this.http.get(`${environment.api}/protected/login/`, options)
            .pipe(
                map(res => res.json().created),
                tap(success => {
                    this.isLoggedIn = success;
                    if (this.isLoggedIn) {
                        this.credentials = auth;
                        this.username = user;
                    }
                })
            )    
    }

    logout(): void {
        this.isLoggedIn = false;
        this.credentials = '';
        this.username = '';
    }

    getCredentials(): RequestOptions {
        try {
            const headers = new Headers();
            headers.append("Authorization", "Basic " + this.credentials);
            return new RequestOptions({ headers: headers });
        } catch (e) {

            console.log("HERE HER EHER")
            throw (e)
        }
        
    }

    getUsername() : string {
        return this.username;
    }
}
