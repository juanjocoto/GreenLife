import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Rol } from './rol.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Rol>;

@Injectable()
export class RolService {

    private resourceUrl =  SERVER_API_URL + 'api/rols';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/rols';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(rol: Rol): Observable<EntityResponseType> {
        const copy = this.convert(rol);
        return this.http.post<Rol>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(rol: Rol): Observable<EntityResponseType> {
        const copy = this.convert(rol);
        return this.http.put<Rol>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Rol>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Rol[]>> {
        const options = createRequestOption(req);
        return this.http.get<Rol[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Rol[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Rol[]>> {
        const options = createRequestOption(req);
        return this.http.get<Rol[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Rol[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Rol = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Rol[]>): HttpResponse<Rol[]> {
        const jsonResponse: Rol[] = res.body;
        const body: Rol[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Rol.
     */
    private convertItemFromServer(rol: Rol): Rol {
        const copy: Rol = Object.assign({}, rol);
        copy.fechaCreacion = this.dateUtils
            .convertLocalDateFromServer(rol.fechaCreacion);
        return copy;
    }

    /**
     * Convert a Rol to a JSON which can be sent to the server.
     */
    private convert(rol: Rol): Rol {
        const copy: Rol = Object.assign({}, rol);
        copy.fechaCreacion = this.dateUtils
            .convertLocalDateToServer(rol.fechaCreacion);
        return copy;
    }
}
