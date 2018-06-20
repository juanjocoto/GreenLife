import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TipoContrato } from './tipo-contrato.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TipoContrato>;

@Injectable()
export class TipoContratoService {

    private resourceUrl =  SERVER_API_URL + 'api/tipo-contratoes';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/tipo-contratoes';

    constructor(private http: HttpClient) { }

    create(tipoContrato: TipoContrato): Observable<EntityResponseType> {
        const copy = this.convert(tipoContrato);
        return this.http.post<TipoContrato>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(tipoContrato: TipoContrato): Observable<EntityResponseType> {
        const copy = this.convert(tipoContrato);
        return this.http.put<TipoContrato>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TipoContrato>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TipoContrato[]>> {
        const options = createRequestOption(req);
        return this.http.get<TipoContrato[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TipoContrato[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<TipoContrato[]>> {
        const options = createRequestOption(req);
        return this.http.get<TipoContrato[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TipoContrato[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TipoContrato = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TipoContrato[]>): HttpResponse<TipoContrato[]> {
        const jsonResponse: TipoContrato[] = res.body;
        const body: TipoContrato[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TipoContrato.
     */
    private convertItemFromServer(tipoContrato: TipoContrato): TipoContrato {
        const copy: TipoContrato = Object.assign({}, tipoContrato);
        return copy;
    }

    /**
     * Convert a TipoContrato to a JSON which can be sent to the server.
     */
    private convert(tipoContrato: TipoContrato): TipoContrato {
        const copy: TipoContrato = Object.assign({}, tipoContrato);
        return copy;
    }
}
