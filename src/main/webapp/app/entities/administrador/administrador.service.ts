import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Administrador } from './administrador.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Administrador>;

@Injectable()
export class AdministradorService {

    private resourceUrl =  SERVER_API_URL + 'api/administradors';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/administradors';

    constructor(private http: HttpClient) { }

    create(administrador: Administrador): Observable<EntityResponseType> {
        const copy = this.convert(administrador);
        return this.http.post<Administrador>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(administrador: Administrador): Observable<EntityResponseType> {
        const copy = this.convert(administrador);
        return this.http.put<Administrador>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Administrador>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Administrador[]>> {
        const options = createRequestOption(req);
        return this.http.get<Administrador[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Administrador[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Administrador[]>> {
        const options = createRequestOption(req);
        return this.http.get<Administrador[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Administrador[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Administrador = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Administrador[]>): HttpResponse<Administrador[]> {
        const jsonResponse: Administrador[] = res.body;
        const body: Administrador[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Administrador.
     */
    private convertItemFromServer(administrador: Administrador): Administrador {
        const copy: Administrador = Object.assign({}, administrador);
        return copy;
    }

    /**
     * Convert a Administrador to a JSON which can be sent to the server.
     */
    private convert(administrador: Administrador): Administrador {
        const copy: Administrador = Object.assign({}, administrador);
        return copy;
    }
}
