import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ComentarioPublicacion } from './comentario-publicacion.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ComentarioPublicacion>;

@Injectable()
export class ComentarioPublicacionService {

    private resourceUrl =  SERVER_API_URL + 'api/comentario-publicacions';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/comentario-publicacions';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(comentarioPublicacion: ComentarioPublicacion): Observable<EntityResponseType> {
        const copy = this.convert(comentarioPublicacion);
        return this.http.post<ComentarioPublicacion>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(comentarioPublicacion: ComentarioPublicacion): Observable<EntityResponseType> {
        const copy = this.convert(comentarioPublicacion);
        return this.http.put<ComentarioPublicacion>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ComentarioPublicacion>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ComentarioPublicacion[]>> {
        const options = createRequestOption(req);
        return this.http.get<ComentarioPublicacion[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ComentarioPublicacion[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ComentarioPublicacion[]>> {
        const options = createRequestOption(req);
        return this.http.get<ComentarioPublicacion[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ComentarioPublicacion[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ComentarioPublicacion = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ComentarioPublicacion[]>): HttpResponse<ComentarioPublicacion[]> {
        const jsonResponse: ComentarioPublicacion[] = res.body;
        const body: ComentarioPublicacion[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ComentarioPublicacion.
     */
    private convertItemFromServer(comentarioPublicacion: ComentarioPublicacion): ComentarioPublicacion {
        const copy: ComentarioPublicacion = Object.assign({}, comentarioPublicacion);
        copy.fechaCreacion = this.dateUtils
            .convertLocalDateFromServer(comentarioPublicacion.fechaCreacion);
        return copy;
    }

    /**
     * Convert a ComentarioPublicacion to a JSON which can be sent to the server.
     */
    private convert(comentarioPublicacion: ComentarioPublicacion): ComentarioPublicacion {
        const copy: ComentarioPublicacion = Object.assign({}, comentarioPublicacion);
        copy.fechaCreacion = this.dateUtils
            .convertLocalDateToServer(comentarioPublicacion.fechaCreacion);
        return copy;
    }
}
