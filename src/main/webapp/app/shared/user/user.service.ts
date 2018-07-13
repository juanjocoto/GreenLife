import { HttpClient, HttpResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';
import { User } from './user.model';
import { createRequestOption } from '../model/request-util';

@Injectable()
export class UserService {
    private resourceUrl = SERVER_API_URL + 'api/users';

    constructor(private http: HttpClient) { }

    create(user: User): Observable<HttpResponse<User>> {
        return this.http.post<User>(this.resourceUrl, user, { observe: 'response' });
    }

    update(user: User): Observable<HttpResponse<User>> {
        return this.http.put<User>(this.resourceUrl, user, { observe: 'response' });
    }

    find(login: string): Observable<HttpResponse<User>> {
        return this.http.get<User>(`${this.resourceUrl}/${login}`, { observe: 'response' });
    }

    findById(id: number): Observable<HttpResponse<User>> {
        return this.http.get<User>(`${this.resourceUrl}/id/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<User[]>> {
        const options = createRequestOption(req);
        return this.http.get<User[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(login: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${this.resourceUrl}/${login}`, { observe: 'response' });
    }

    authorities(): Observable<string[]> {
        return this.http.get<string[]>(SERVER_API_URL + 'api/users/authorities');
    }

    registerComerciante(): Observable<HttpResponse<User>> {
        // throw new Error("Method not implemented.");

        const options = createRequestOption({ value: true });

        return this.http.put<User>(`${this.resourceUrl}/register/comerciante`, undefined, { params: options, observe: 'response' });
        // /users/register/comerciante
    }

}
