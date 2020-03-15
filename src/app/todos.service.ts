import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { delay, catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

export interface Todo {
    completed: boolean;
    title: string;
    id?: number;
}

@Injectable({providedIn: 'root'})
export class TodosService {

    constructor(private http: HttpClient) {}

    public addTodo(todo: Todo): Observable<Todo> {
        return this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo, {
            headers: new HttpHeaders({
                'MyCustomHeader': Math.random().toString(),
                'dsdfds': '123',
            }),
        });
    }

    public fetchTodos(): Observable<Todo[]> {
        let params = new HttpParams();
        params = params.append('_limit', '3');
        params = params.append('something', 'sdfsdfs');

        return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos', {
            // params: params,
            params,
            observe: 'response',
        })
            .pipe(
                map((response) => {
                    return response.body;
                }),
                delay(1500),
                catchError((error) => {
                    console.log(error.message);
                    return throwError(error);
                }),
            );
    }

    public removeTodo(id: number): Observable<any> {
        return this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            observe: 'events',
        }).pipe(
            tap((event) => {
                if (event.type === HttpEventType.Sent) {
                    console.log('Sent', event);
                }

                if (event.type === HttpEventType.Response) {
                    console.log('Response', event);
                }
            })
        );
    }

    public completeTodo(id: number): Observable<any>{
        return this.http.put<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            completed: true,
        }, {
            responseType: 'json',
        }).pipe(
            catchError((error) => {
                console.log(error.message);
                return throwError(error);
            })
        );
    }
}
