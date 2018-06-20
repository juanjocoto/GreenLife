import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Publicacion } from './publicacion.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Publicacion>;

@Injectable()
export class PublicacionService {

    private resourceUrl =  SERVER_API_URL + 'api/publicacions';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/publicacions';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(publicacion: Publicacion): Observable<EntityResponseType> {
        const copy = this.convert(publicacion);
        return this.http.post<Publicacion>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(publicacion: Publicacion): Observable<EntityResponseType> {
        const copy = this.convert(publicacion);
        return this.http.put<Publicacion>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Publicacion>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Publicacion[]>> {
        const options = createRequestOption(req);
        return this.http.get<Publicacion[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Publicacion[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Publicacion[]>> {
        const options = createRequestOption(req);
        return this.http.get<Publicacion[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Publicacion[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Publicacion = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Publicacion[]>): HttpResponse<Publicacion[]> {
        const jsonResponse: Publicacion[] = res.body;
        const body: Publicacion[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Publicacion.
     */
    private convertItemFromServer(publicacion: Publicacion): Publicacion {
        const copy: Publicacion = Object.assign({}, publicacion);
        copy.fechaCreacion = this.dateUtils
            .convertLocalDateFromServer(publicacion.fechaCreacion);
        return copy;
    }

    /**
     * Convert a Publicacion to a JSON which can be sent to the server.
     */
    private convert(publicacion: Publicacion): Publicacion {
        const copy: Publicacion = Object.assign({}, publicacion);
        copy.fechaCreacion = this.dateUtils
            .convertLocalDateToServer(publicacion.fechaCreacion);
        return copy;
    }
}
