import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Permiso } from './permiso.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Permiso>;

@Injectable()
export class PermisoService {

    private resourceUrl =  SERVER_API_URL + 'api/permisos';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/permisos';

    constructor(private http: HttpClient) { }

    create(permiso: Permiso): Observable<EntityResponseType> {
        const copy = this.convert(permiso);
        return this.http.post<Permiso>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(permiso: Permiso): Observable<EntityResponseType> {
        const copy = this.convert(permiso);
        return this.http.put<Permiso>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Permiso>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Permiso[]>> {
        const options = createRequestOption(req);
        return this.http.get<Permiso[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Permiso[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Permiso[]>> {
        const options = createRequestOption(req);
        return this.http.get<Permiso[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Permiso[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Permiso = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Permiso[]>): HttpResponse<Permiso[]> {
        const jsonResponse: Permiso[] = res.body;
        const body: Permiso[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Permiso.
     */
    private convertItemFromServer(permiso: Permiso): Permiso {
        const copy: Permiso = Object.assign({}, permiso);
        return copy;
    }

    /**
     * Convert a Permiso to a JSON which can be sent to the server.
     */
    private convert(permiso: Permiso): Permiso {
        const copy: Permiso = Object.assign({}, permiso);
        return copy;
    }
}
