import { Injectable } from '@angular/core';
import { Init } from './todos';

@Injectable()
export class TodoService extends Init {

  constructor() {
    super();
    console.log('Todo list uploaded');
    this.load();
  }
  getTodos() {
    const todos = JSON.parse(localStorage.getItem('todos'));
    return todos;
  }
  addTodo(newTodo) {
    const todos = JSON.parse(localStorage.getItem('todos'));
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  deleteTodo(todoId) {
    const todos = JSON.parse(localStorage.getItem('todos'));
    todos.map((t, index) => {
      if (t.id === todoId) {
        todos.splice(index, 1);
      }
    });
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  updateTodo(todoId, title, description, created_at) {
    const todos = JSON.parse(localStorage.getItem('todos'));
    todos.map(t => {
      if (t.id === todoId) {
        t.title = title;
        t.description = description;
        t.created_at = created_at;
      }
    });
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}
