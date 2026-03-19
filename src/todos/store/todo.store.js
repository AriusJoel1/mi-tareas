import { Todo } from '../models/todo.model';

const loadInitialTodos = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        new Todo({
          id: crypto.randomUUID(),
          description: 'Aprender módulos en Vite',
          done: false,
        }),
        new Todo({
          id: crypto.randomUUID(),
          description: 'Crear un store centralizado',
          done: true,
        }),
        new Todo({
          id: crypto.randomUUID(),
          description: 'Renderizar tareas en el DOM',
          done: false,
        }),
      ]);
    }, 1200);
  });
};

class TodoStore {
  constructor() {
    this.todos = [];
    this.listeners = [];
  }

  async init() {
    this.todos = await loadInitialTodos();
    this.notify();
  }

  getTodos() {
    return [...this.todos];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    listener(this.getTodos());

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notify() {
    const state = this.getTodos();
    this.listeners.forEach((listener) => listener(state));
  }

  addTodo(description) {
    const newTodo = new Todo({
      id: crypto.randomUUID(),
      description,
      done: false,
    });

    this.todos = [newTodo, ...this.todos];
    this.notify();
  }

  toggleTodo(id) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return new Todo({
          id: todo.id,
          description: todo.description,
          done: !todo.done,
        });
      }
      return todo;
    });

    this.notify();
  }
}

export const todoStore = new TodoStore();