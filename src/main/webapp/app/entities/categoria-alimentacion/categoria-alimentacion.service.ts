import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CategoriaAlimentacion } from './categoria-alimentacion.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CategoriaAlimentacion>;

@Injectable()
export class CategoriaAlimentacionService {

    private resourceUrl =  SERVER_API_URL + 'api/categoria-alimentacions';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/categoria-alimentacions';

    constructor(private http: HttpClient) { }

    create(categoriaAlimentacion: CategoriaAlimentacion): Observable<EntityResponseType> {
        const copy = this.convert(categoriaAlimentacion);
        return this.http.post<CategoriaAlimentacion>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(categoriaAlimentacion: CategoriaAlimentacion): Observable<EntityResponseType> {
        const copy = this.convert(categoriaAlimentacion);
        return this.http.put<CategoriaAlimentacion>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CategoriaAlimentacion>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CategoriaAlimentacion[]>> {
        const options = createRequestOption(req);
        return this.http.get<CategoriaAlimentacion[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CategoriaAlimentacion[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<CategoriaAlimentacion[]>> {
        const options = createRequestOption(req);
        return this.http.get<CategoriaAlimentacion[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CategoriaAlimentacion[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CategoriaAlimentacion = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CategoriaAlimentacion[]>): HttpResponse<CategoriaAlimentacion[]> {
        const jsonResponse: CategoriaAlimentacion[] = res.body;
        const body: CategoriaAlimentacion[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CategoriaAlimentacion.
     */
    private convertItemFromServer(categoriaAlimentacion: CategoriaAlimentacion): CategoriaAlimentacion {
        const copy: CategoriaAlimentacion = Object.assign({}, categoriaAlimentacion);
        return copy;
    }

    /**
     * Convert a CategoriaAlimentacion to a JSON which can be sent to the server.
     */
    private convert(categoriaAlimentacion: CategoriaAlimentacion): CategoriaAlimentacion {
        const copy: CategoriaAlimentacion = Object.assign({}, categoriaAlimentacion);
        return copy;
    }
}
