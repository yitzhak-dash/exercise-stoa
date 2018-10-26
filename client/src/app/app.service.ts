import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) {
  }

  getStatus(key: string): Observable<{ result: number, key: string }> {
    const url = `api/status?key=${key}`;
    return this.http.get<{ result: number, key: string }>(url);
  }

  sendData(data: { images: string[], propertyInfo: string }): Observable<string> {
    const url = 'api/address';
    return this.http.post<{ key: string }>(url, data).pipe(map(res => res.key));
  }
}
