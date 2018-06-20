import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Etiqueta } from './etiqueta.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Etiqueta>;

@Injectable()
export class EtiquetaService {

    private resourceUrl =  SERVER_API_URL + 'api/etiquetas';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/etiquetas';

    constructor(private http: HttpClient) { }

    create(etiqueta: Etiqueta): Observable<EntityResponseType> {
        const copy = this.convert(etiqueta);
        return this.http.post<Etiqueta>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(etiqueta: Etiqueta): Observable<EntityResponseType> {
        const copy = this.convert(etiqueta);
        return this.http.put<Etiqueta>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Etiqueta>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Etiqueta[]>> {
        const options = createRequestOption(req);
        return this.http.get<Etiqueta[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Etiqueta[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Etiqueta[]>> {
        const options = createRequestOption(req);
        return this.http.get<Etiqueta[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Etiqueta[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Etiqueta = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Etiqueta[]>): HttpResponse<Etiqueta[]> {
        const jsonResponse: Etiqueta[] = res.body;
        const body: Etiqueta[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Etiqueta.
     */
    private convertItemFromServer(etiqueta: Etiqueta): Etiqueta {
        const copy: Etiqueta = Object.assign({}, etiqueta);
        return copy;
    }

    /**
     * Convert a Etiqueta to a JSON which can be sent to the server.
     */
    private convert(etiqueta: Etiqueta): Etiqueta {
        const copy: Etiqueta = Object.assign({}, etiqueta);
        return copy;
    }
}
