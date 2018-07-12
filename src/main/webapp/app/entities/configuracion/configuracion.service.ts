import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Configuracion } from './configuracion.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Configuracion>;

@Injectable()
export class ConfiguracionService {

    private resourceUrl =  SERVER_API_URL + 'api/configuracions';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/configuracions';

    constructor(private http: HttpClient) { }

    create(configuracion: Configuracion): Observable<EntityResponseType> {
        const copy = this.convert(configuracion);
        return this.http.post<Configuracion>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(configuracion: Configuracion): Observable<EntityResponseType> {
        const copy = this.convert(configuracion);
        return this.http.put<Configuracion>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Configuracion>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findAll(): Observable<HttpResponse<Configuracion[]>> {
        return this.http.get<Configuracion[]>(`${this.resourceUrl}/`, { observe: 'response'})
            .map((res: HttpResponse<Configuracion[]>) => this.convertArrayResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Configuracion[]>> {
        const options = createRequestOption(req);
        return this.http.get<Configuracion[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Configuracion[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Configuracion[]>> {
        const options = createRequestOption(req);
        return this.http.get<Configuracion[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Configuracion[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Configuracion = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Configuracion[]>): HttpResponse<Configuracion[]> {
        const jsonResponse: Configuracion[] = res.body;
        const body: Configuracion[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Configuracion.
     */
    private convertItemFromServer(configuracion: Configuracion): Configuracion {
        const copy: Configuracion = Object.assign({}, configuracion);
        return copy;
    }

    /**
     * Convert a Configuracion to a JSON which can be sent to the server.
     */
    private convert(configuracion: Configuracion): Configuracion {
        const copy: Configuracion = Object.assign({}, configuracion);
        return copy;
    }
}
