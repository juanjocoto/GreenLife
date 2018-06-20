import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Comercio } from './comercio.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Comercio>;

@Injectable()
export class ComercioService {

    private resourceUrl =  SERVER_API_URL + 'api/comercios';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/comercios';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(comercio: Comercio): Observable<EntityResponseType> {
        const copy = this.convert(comercio);
        return this.http.post<Comercio>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(comercio: Comercio): Observable<EntityResponseType> {
        const copy = this.convert(comercio);
        return this.http.put<Comercio>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Comercio>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Comercio[]>> {
        const options = createRequestOption(req);
        return this.http.get<Comercio[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Comercio[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Comercio[]>> {
        const options = createRequestOption(req);
        return this.http.get<Comercio[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Comercio[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Comercio = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Comercio[]>): HttpResponse<Comercio[]> {
        const jsonResponse: Comercio[] = res.body;
        const body: Comercio[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Comercio.
     */
    private convertItemFromServer(comercio: Comercio): Comercio {
        const copy: Comercio = Object.assign({}, comercio);
        copy.fechaCreacion = this.dateUtils
            .convertLocalDateFromServer(comercio.fechaCreacion);
        return copy;
    }

    /**
     * Convert a Comercio to a JSON which can be sent to the server.
     */
    private convert(comercio: Comercio): Comercio {
        const copy: Comercio = Object.assign({}, comercio);
        copy.fechaCreacion = this.dateUtils
            .convertLocalDateToServer(comercio.fechaCreacion);
        return copy;
    }
}
