import * as data from './list.json';
export class Init {
  load() {
    if (localStorage.getItem('todos') === null || localStorage.getItem('todos') === undefined) {
      const todos = data;
      localStorage.setItem('todos', JSON.stringify(todos));
      return;
    }
  }
}
