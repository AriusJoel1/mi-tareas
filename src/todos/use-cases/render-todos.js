export const renderTodos = (element, todos, { onAdd, onToggle }) => {
  const pending = todos.filter((todo) => !todo.done).length;
  const completed = todos.filter((todo) => todo.done).length;

  element.innerHTML = `
    <section class="app">
      <h1>Mini App de Tareas</h1>

      <form class="todo-form" data-form>
        <input
          type="text"
          placeholder="Escribe una tarea..."
          class="todo-input"
          data-input
          autocomplete="off"
        />
        <button type="submit" class="todo-button">Agregar</button>
      </form>

      <div class="stats">
        <span>Pendientes: ${pending}</span>
        <span>Completadas: ${completed}</span>
      </div>

      <ul class="todo-list" data-list>
        ${
          todos.length > 0
            ? todos
                .map(
                  (todo) => `
                    <li class="todo-item ${todo.done ? 'done' : ''}">
                      <label>
                        <input
                          type="checkbox"
                          ${todo.done ? 'checked' : ''}
                          data-id="${todo.id}"
                        />
                        <span>${todo.description}</span>
                      </label>
                    </li>
                  `
                )
                .join('')
            : `<li class="empty">Cargando tareas...</li>`
        }
      </ul>
    </section>
  `;

  const form = element.querySelector('[data-form]');
  const input = element.querySelector('[data-input]');
  const list = element.querySelector('[data-list]');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const description = input.value.trim();
    if (!description) return;

    onAdd(description);
    form.reset();
    input.focus();
  });

  list.addEventListener('change', (event) => {
    const target = event.target;

    if (target.matches('input[type="checkbox"][data-id]')) {
      onToggle(target.dataset.id);
    }
  });
};