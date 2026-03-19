import { Todo } from '../models/todo.model';

const STORAGE_KEY = 'mini-app-tareas-v1';

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
    this.loading = true;
    this.initialized = false;
  }

  getState() {
    return {
      todos: [...this.todos],
      loading: this.loading,
    };
  }

  subscribe(listener) {
    this.listeners.push(listener);
    listener(this.getState());

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notify() {
    const state = this.getState();
    this.listeners.forEach((listener) => listener(state));
  }

  readFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return null;

      return parsed.map((item) => new Todo(item));
    } catch {
      return null;
    }
  }

  persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
  }

  async init() {
    if (this.initialized) return;
    this.initialized = true;

    const storedTodos = this.readFromStorage();

    if (storedTodos && storedTodos.length > 0) {
      this.todos = storedTodos;
      this.loading = false;
      this.notify();
      return;
    }

    this.todos = await loadInitialTodos();
    this.loading = false;
    this.persist();
    this.notify();
  }

  addTodo(description) {
    const cleanDescription = description.trim();
    if (!cleanDescription) return;

    const newTodo = new Todo({
      id: crypto.randomUUID(),
      description: cleanDescription,
      done: false,
    });

    this.todos = [newTodo, ...this.todos];
    this.persist();
    this.notify();
  }

  toggleTodo(id) {
    this.todos = this.todos.map((todo) => {
      if (todo.id !== id || todo.annulled) return todo;

      return new Todo({
        id: todo.id,
        description: todo.description,
        done: !todo.done,
        annulled: todo.annulled,
        annulReason: todo.annulReason,
        annulledAt: todo.annulledAt,
      });
    });

    this.persist();
    this.notify();
  }

  editTodo(id, newDescription) {
    const cleanDescription = newDescription.trim();
    if (!cleanDescription) return;

    this.todos = this.todos.map((todo) => {
      if (todo.id !== id || todo.annulled) return todo;

      return new Todo({
        id: todo.id,
        description: cleanDescription,
        done: todo.done,
        annulled: todo.annulled,
        annulReason: todo.annulReason,
        annulledAt: todo.annulledAt,
      });
    });

    this.persist();
    this.notify();
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.persist();
    this.notify();
  }

  annulTodo(id, reason) {
    const cleanReason = reason.trim();
    if (!cleanReason) return;

    this.todos = this.todos.map((todo) => {
      if (todo.id !== id || todo.annulled) return todo;

      return new Todo({
        id: todo.id,
        description: todo.description,
        done: false,
        annulled: true,
        annulReason: cleanReason,
        annulledAt: new Date().toISOString(),
      });
    });

    this.persist();
    this.notify();
  }
}

export const todoStore = new TodoStore();