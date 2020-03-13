import { Component, OnInit } from '@angular/core';
import { TodosService } from './todos.service';
import { Todo } from './todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  public todos: Todo[] = [];
  public newTitle = '';
  public loading = false;
  public error = '';

  constructor(private todosService: TodosService) { }

  ngOnInit() {
    this.fetchTodos();
  }

  public addTodo() {
    if (!this.newTitle.trim()) {
      return;
    }

    this.todosService.addTodo({
      title: this.newTitle,
      completed: false,
    }).subscribe((todo) => {
      this.todos.push(todo);
      this.newTitle = '';
    });
  }

  public fetchTodos() {
    this.loading = true;
    this.todosService.fetchTodos()
      .subscribe((todos) => {
        this.todos = todos;
        this.loading = false;
      }, (error) => {
        this.error = error.message;
      });
  }

  public removeTodo(id: number) {
    this.todosService.removeTodo(id)
      .subscribe(() => {
        this.todos = this.todos.filter((todo) => todo.id !== id);
      });
  }

  public completeTodo(id: number) {
    this.todosService.completeTodo(id).subscribe((todo) => {
      this.todos.find((t) => t.id === id).completed = true;
    }, (error) => {
      this.error = error.message;
    });
  }
}

