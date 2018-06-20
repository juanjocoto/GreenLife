import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { LineaEntrega } from './linea-entrega.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<LineaEntrega>;

@Injectable()
export class LineaEntregaService {

    private resourceUrl =  SERVER_API_URL + 'api/linea-entregas';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/linea-entregas';

    constructor(private http: HttpClient) { }

    create(lineaEntrega: LineaEntrega): Observable<EntityResponseType> {
        const copy = this.convert(lineaEntrega);
        return this.http.post<LineaEntrega>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(lineaEntrega: LineaEntrega): Observable<EntityResponseType> {
        const copy = this.convert(lineaEntrega);
        return this.http.put<LineaEntrega>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<LineaEntrega>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<LineaEntrega[]>> {
        const options = createRequestOption(req);
        return this.http.get<LineaEntrega[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<LineaEntrega[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<LineaEntrega[]>> {
        const options = createRequestOption(req);
        return this.http.get<LineaEntrega[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<LineaEntrega[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: LineaEntrega = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<LineaEntrega[]>): HttpResponse<LineaEntrega[]> {
        const jsonResponse: LineaEntrega[] = res.body;
        const body: LineaEntrega[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to LineaEntrega.
     */
    private convertItemFromServer(lineaEntrega: LineaEntrega): LineaEntrega {
        const copy: LineaEntrega = Object.assign({}, lineaEntrega);
        return copy;
    }

    /**
     * Convert a LineaEntrega to a JSON which can be sent to the server.
     */
    private convert(lineaEntrega: LineaEntrega): LineaEntrega {
        const copy: LineaEntrega = Object.assign({}, lineaEntrega);
        return copy;
    }
}
