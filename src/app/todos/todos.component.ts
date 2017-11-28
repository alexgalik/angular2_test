import { Component, OnInit } from '@angular/core';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  p = 1;
  todos;
  model = {
    id: '',
    title: '',
    description: '',
    date: ''
  };
  filter = {
    title: '',
    selectedDate: '',
  };
  dates = [];
  re = /(\d{4})\-(\d{2})\-(\d{2})/;
  now = new Date().toJSON().slice(0, 10);
  filtredList;
  error = false;
  editing = false;
  constructor(private _todoService: TodoService) {
   }

  ngOnInit() {
    this.todos = this._todoService.getTodos();
    this.filtredList = this.todos;
    this.todos.map(t => {
      this.dates.push(t.created_at);
    });
    function uniqueDate(value, index, self) {
      return self.indexOf(value) === index;
    }
    this.dates = this.dates.filter(uniqueDate);
    const newdates = [];
    this.dates.map(date => {
      newdates.push(date.replace(this.re, '$2/$3/$1'));
    });
    this.dates = newdates;
  }

  addTodo() {
    this.error = false;
    const now = this.now.replace(this.re, '$1-$3-$2');
    const id = this.todos[this.todos.length - 1].id + 1;
    const newTodo = {
      id: id,
      title: this.model.title,
      description: this.model.description,
      created_at: now
    };
    if (newTodo.title === '' || newTodo.description === '') {
      this.error = true;
    } else {
      this.todos.push(newTodo);
      this._todoService.addTodo(newTodo);
    }
  }
  deleteTodo(todoId) {
    this.todos.map((t, index) => {
      if (t.id === todoId) {
        this.todos.splice(index, 1);
      }
    });
    this._todoService.deleteTodo(todoId);
  }
  editTodo(todoId) {
    this.editing = true;
    this.todos.map(t => {
      if (t.id === todoId) {
        this.model.title = t.title;
        this.model.description = t.description;
        this.model.id = t.id;
      }
    });
  }
  updateTodo(todoId) {
    const now = this.now.replace(this.re, '$1-$3-$2');
    this.editing = false;
    this.todos.map(t => {
      if (t.id === todoId) {
        t.title = this.model.title;
        t.description = this.model.description;
        t.created_at = now;
        this._todoService.updateTodo(todoId, this.model.title, this.model.description, now);
      }
    });
    this.model.title = '';
    this.model.description = '';
    this.filterList();
  }

  filterList() {
    const re = /(\d{2})\/(\d{2})\/(\d{4})/;
    const date = this.filter.selectedDate.replace(re, '$3-$1-$2');
    const filterOptions = {
      title: this.filter.title,
      date: date
    };
    if (filterOptions.title !== '' || filterOptions.date !== '') {
      if (filterOptions.title !== '') {
        this.filtredList = [];
        this.todos.map(t => {
          if (t.title === filterOptions.title) {
            this.filtredList.push(t);
          }
        });
      }
      if (filterOptions.date !== '') {
        this.filtredList = [];
        this.todos.map(t => {
          if (t.created_at === filterOptions.date) {
            this.filtredList.push(t);
          }
        });
      }
      if (filterOptions.date !== '' && filterOptions.title !== '') {
        this.filtredList = [];
        this.todos.map(t => {
          if (t.created_at === filterOptions.date && t.title === filterOptions.title) {
            this.filtredList.push(t);
          }
        });
      }
    } else {
      this.filtredList = this.todos;
    }
  }
}

