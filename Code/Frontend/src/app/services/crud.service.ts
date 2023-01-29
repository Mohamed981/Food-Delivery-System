import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { FilterObject } from '../models/filter-object';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor( private _requestService: RequestService) { }
  getList <T > (ControllerName: string): Observable<T[]> {
		return this._requestService.SendRequest('GET', environment.apiBaseURL + ControllerName, null);
    }
    getPaginatedList <T>(ControllerName: string, filterObject: FilterObject): Observable<any> {
        return this._requestService.SendRequest('POST', environment.apiBaseURL + ControllerName + '/filteredList', filterObject);
    }
    getById <T> (ControllerName: string, id: number): Observable<T> {
      return this._requestService.SendRequest('GET', environment.apiBaseURL + ControllerName + '/' + id, null);
  }
    getByName <T> (ControllerName: string, name: string): Observable<T> {
        return this._requestService.SendRequest('GET', environment.apiBaseURL + ControllerName + '/' + name, null);
    }
    add <T>(ControllerName: string, addedObject: Object): Observable<T[]> {
      console.log(addedObject);
      
        return this._requestService.SendRequest('POST', environment.apiBaseURL + ControllerName, addedObject);
    }
    edit <T>(ControllerName: string, editedObject: Object, id: number): Observable<T> {
        return this._requestService.SendRequest('PUT', environment.apiBaseURL + ControllerName + '/' + id, editedObject);
    }
    delete <T> (ControllerName: string, id: number): Observable<T[]>  {
        return this._requestService.SendRequest('DELETE', environment.apiBaseURL + ControllerName + '/' + id, null);
    }
}
