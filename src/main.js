import './style.css';
import { todoStore } from './todos/store/todo.store';
import { renderTodos } from './todos/use-cases/render-todos';

const appElement = document.querySelector('#app');

const render = (state) => {
  renderTodos(appElement, state, {
    onAdd: (description) => todoStore.addTodo(description),
    onToggle: (id) => todoStore.toggleTodo(id),
    onEdit: (id, newDescription) => todoStore.editTodo(id, newDescription),
    onDelete: (id) => todoStore.deleteTodo(id),
    onAnnul: (id, reason) => todoStore.annulTodo(id, reason),
  });
};

todoStore.subscribe(render);
todoStore.init();