import './style.css';
import { todoStore } from './todos/store/todo.store';
import { renderTodos } from './todos/use-cases/render-todos';

const appElement = document.querySelector('#app');

const render = (todos) => {
  renderTodos(appElement, todos, {
    onAdd: (description) => {
      todoStore.addTodo(description);
    },
    onToggle: (id) => {
      todoStore.toggleTodo(id);
    },
  });
};

todoStore.subscribe(render);

(async () => {
  await todoStore.init();
})();