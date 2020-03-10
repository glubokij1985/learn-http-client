import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Todo {
  completed: boolean;
  title: string;
  id?: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  public todos: Todo[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=2')
      .subscribe((todos) => {
        console.log('Todos: ', todos);
        this.todos = todos;
      });
  }
}

