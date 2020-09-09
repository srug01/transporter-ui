import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../shared/models/user';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private baseUri: string = environment.baseUri;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('token')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public getToken(): string {
        return localStorage.getItem('token');
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        // Check whether the token is expired and return
        // true or false
        if (token) {
            return true;
        } else {
            return false;
        }
    }

    login(username: string, password: string, role: number) {
        console.log(role);
        return this.http.post<any>(`${this.baseUri}users/login`, { email: username, password })
            .pipe(map(res => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', JSON.stringify(res.token));
                localStorage.setItem('userID', JSON.stringify(res.userProfile.userId));
                localStorage.setItem('roleID', JSON.stringify(res.userProfile.typeSyscode));
                this.currentUserSubject.next(res);
                return res;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
        localStorage.removeItem('roleID');
        this.currentUserSubject.next(null);
    }
}
