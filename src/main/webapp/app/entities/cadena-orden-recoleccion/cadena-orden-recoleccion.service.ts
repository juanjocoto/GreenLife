import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CadenaOrdenRecoleccion } from './cadena-orden-recoleccion.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CadenaOrdenRecoleccion>;

@Injectable()
export class CadenaOrdenRecoleccionService {

    private resourceUrl =  SERVER_API_URL + 'api/cadena-orden-recoleccions';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/cadena-orden-recoleccions';

    constructor(private http: HttpClient) { }

    create(cadenaOrdenRecoleccion: CadenaOrdenRecoleccion): Observable<EntityResponseType> {
        const copy = this.convert(cadenaOrdenRecoleccion);
        return this.http.post<CadenaOrdenRecoleccion>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cadenaOrdenRecoleccion: CadenaOrdenRecoleccion): Observable<EntityResponseType> {
        const copy = this.convert(cadenaOrdenRecoleccion);
        return this.http.put<CadenaOrdenRecoleccion>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CadenaOrdenRecoleccion>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CadenaOrdenRecoleccion[]>> {
        const options = createRequestOption(req);
        return this.http.get<CadenaOrdenRecoleccion[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CadenaOrdenRecoleccion[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<CadenaOrdenRecoleccion[]>> {
        const options = createRequestOption(req);
        return this.http.get<CadenaOrdenRecoleccion[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CadenaOrdenRecoleccion[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CadenaOrdenRecoleccion = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CadenaOrdenRecoleccion[]>): HttpResponse<CadenaOrdenRecoleccion[]> {
        const jsonResponse: CadenaOrdenRecoleccion[] = res.body;
        const body: CadenaOrdenRecoleccion[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CadenaOrdenRecoleccion.
     */
    private convertItemFromServer(cadenaOrdenRecoleccion: CadenaOrdenRecoleccion): CadenaOrdenRecoleccion {
        const copy: CadenaOrdenRecoleccion = Object.assign({}, cadenaOrdenRecoleccion);
        return copy;
    }

    /**
     * Convert a CadenaOrdenRecoleccion to a JSON which can be sent to the server.
     */
    private convert(cadenaOrdenRecoleccion: CadenaOrdenRecoleccion): CadenaOrdenRecoleccion {
        const copy: CadenaOrdenRecoleccion = Object.assign({}, cadenaOrdenRecoleccion);
        return copy;
    }
}
