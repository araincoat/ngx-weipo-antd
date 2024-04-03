import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

export interface QueryParams {
  filter?: Array<{ key: string; value: string | string[] }>
  pageIndex?: number
  pageSize?: number
  sort?: Array<{ key: string; value: string | 'ascend' | 'descend' | null }>
}

export interface PagedResponse<T> {
  totalCount: number
  items: T[]
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient)
  private getHttpParams(queryParams: QueryParams): HttpParams {
    let params = new HttpParams()
    const { filter, pageIndex, pageSize, sort } = queryParams
    if (filter) {
      filter.forEach(f => {
        if (f.value instanceof Array) {
          f.value.forEach(value => {
            params.append(f.key, value)
          })
        } else params.append(f.key, f.value)
      })
    }
    if (pageIndex && pageSize) {
      params.append('SkipCount', (pageIndex - 1) * pageSize)
      params.append('MaxResultCount', pageSize)
    }
    if (sort) {
      let sorting = ''
      sort.forEach(s => {
        if (sorting.length > 0) sorting += ','
        sorting += s.key
        switch (s.value) {
          case 'desc':
          case 'descend':
            sorting += ' desc'
            break
          default:
            sorting += ' asc'
        }
      })
      if (sorting.length > 0) {
        params.append('Sorting', sorting)
      }
    }
    return params
  }

  get<T>(
    url: string,
    queryParams: QueryParams
  ): Observable<T> {
    let params = this.getHttpParams(queryParams)
    return this.http
      .get<T>(url, { params })
      .pipe(catchError(() => of({} as T )))
  }
}
