import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'
import {environment} from '../../../environments/environment'
import {CurrentUserInterface} from '../../shared/types/currentUser.interface'
import {map} from 'rxjs/operators'
import { RegisterRequestInterface } from '../types/registerRequest.interface'
import { AuthResponseInterface } from '../types/authResponse.interface'
import { LoginRequestInterface } from '../types/loginRequest.interface'

@Injectable({
    providedIn:'root'
})
export class AuthService {
    constructor(private http: HttpClient){}

    getUser(response:AuthResponseInterface):CurrentUserInterface {
        return response.user;
    }

    register(data:RegisterRequestInterface):Observable<CurrentUserInterface> {
        const url = environment.apiUrl + '/users'
        return this.http
        .post<AuthResponseInterface>(url, data)
        .pipe(map(this.getUser))
    }

    login(data:LoginRequestInterface):Observable<CurrentUserInterface> {
        const url = environment.apiUrl + '/users/login'
        return this.http
        .post<AuthResponseInterface>(url, data)
        .pipe(map(this.getUser))
    }
}