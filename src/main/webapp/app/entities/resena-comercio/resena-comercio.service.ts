import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ResenaComercio } from './resena-comercio.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ResenaComercio>;

@Injectable()
export class ResenaComercioService {

    private resourceUrl =  SERVER_API_URL + 'api/resena-comercios';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/resena-comercios';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(resenaComercio: ResenaComercio): Observable<EntityResponseType> {
        const copy = this.convert(resenaComercio);
        return this.http.post<ResenaComercio>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(resenaComercio: ResenaComercio): Observable<EntityResponseType> {
        const copy = this.convert(resenaComercio);
        return this.http.put<ResenaComercio>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ResenaComercio>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ResenaComercio[]>> {
        const options = createRequestOption(req);
        return this.http.get<ResenaComercio[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ResenaComercio[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ResenaComercio[]>> {
        const options = createRequestOption(req);
        return this.http.get<ResenaComercio[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ResenaComercio[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ResenaComercio = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ResenaComercio[]>): HttpResponse<ResenaComercio[]> {
        const jsonResponse: ResenaComercio[] = res.body;
        const body: ResenaComercio[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ResenaComercio.
     */
    private convertItemFromServer(resenaComercio: ResenaComercio): ResenaComercio {
        const copy: ResenaComercio = Object.assign({}, resenaComercio);
        copy.fechaCreacion = this.dateUtils
            .convertLocalDateFromServer(resenaComercio.fechaCreacion);
        return copy;
    }

    /**
     * Convert a ResenaComercio to a JSON which can be sent to the server.
     */
    private convert(resenaComercio: ResenaComercio): ResenaComercio {
        const copy: ResenaComercio = Object.assign({}, resenaComercio);
        copy.fechaCreacion = this.dateUtils
            .convertLocalDateToServer(resenaComercio.fechaCreacion);
        return copy;
    }
}
