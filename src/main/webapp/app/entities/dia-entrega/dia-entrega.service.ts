import { HttpClient, HttpResponse } from '@angular/common/http';

import { DiaEntrega } from './dia-entrega.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DiaEntrega>;

@Injectable()
export class DiaEntregaService {

    private resourceUrl = SERVER_API_URL + 'api/dia-entregas';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/dia-entregas';

    constructor(private http: HttpClient) { }

    create(diaEntrega: DiaEntrega): Observable<EntityResponseType> {
        const copy = this.convert(diaEntrega);
        return this.http.post<DiaEntrega>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(diaEntrega: DiaEntrega): Observable<EntityResponseType> {
        const copy = this.convert(diaEntrega);
        return this.http.put<DiaEntrega>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DiaEntrega>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    getAll(): Observable<HttpResponse<DiaEntrega[]>> {
        return this.http.get<DiaEntrega[]>(this.resourceUrl, { observe: 'response' })
            .map((res: HttpResponse<DiaEntrega[]>) => this.convertArrayResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DiaEntrega[]>> {
        const options = createRequestOption(req);
        return this.http.get<DiaEntrega[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DiaEntrega[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<HttpResponse<DiaEntrega[]>> {
        const options = createRequestOption(req);
        return this.http.get<DiaEntrega[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DiaEntrega[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DiaEntrega = this.convertItemFromServer(res.body);
        return res.clone({ body });
    }

    private convertArrayResponse(res: HttpResponse<DiaEntrega[]>): HttpResponse<DiaEntrega[]> {
        const jsonResponse: DiaEntrega[] = res.body;
        const body: DiaEntrega[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({ body });
    }

    /**
     * Convert a returned JSON object to DiaEntrega.
     */
    private convertItemFromServer(diaEntrega: DiaEntrega): DiaEntrega {
        const copy: DiaEntrega = Object.assign({}, diaEntrega);
        return copy;
    }

    /**
     * Convert a DiaEntrega to a JSON which can be sent to the server.
     */
    private convert(diaEntrega: DiaEntrega): DiaEntrega {
        const copy: DiaEntrega = Object.assign({}, diaEntrega);
        return copy;
    }
}
