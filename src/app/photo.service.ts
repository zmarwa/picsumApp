import { Injectable } from '@angular/core';
import { Photo } from './photo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

private apiUrl = 'https://picsum.photos/id/';  // URL to web api

  constructor(private http: HttpClient) { }
  getInfo(id: number): Observable<Photo> {
  	const url = `${this.apiUrl}/${id}/info`;
  	return this.http.get<Photo>(url);
    /*.pipe(
      tap(_ => this.log(`fetched photo id=${id}`)),
      catchError(this.handleError<Photo>(`getInfo id=${id}`))
    );*/
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      //console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }

}
