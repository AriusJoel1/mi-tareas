export const renderTodos = (element, { todos, loading }, { onAdd, onToggle, onEdit, onDelete, onAnnul }) => {
  const activeTodos = todos.filter((todo) => !todo.annulled);
  const pending = activeTodos.filter((todo) => !todo.done).length;
  const completed = activeTodos.filter((todo) => todo.done).length;
  const annulled = todos.filter((todo) => todo.annulled).length;

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
          ${loading ? 'disabled' : ''}
        />
        <button type="submit" class="todo-button" ${loading ? 'disabled' : ''}>
          Agregar
        </button>
      </form>

      <div class="stats">
        <span>Pendientes: ${pending}</span>
        <span>Completadas: ${completed}</span>
        <span>Anuladas: ${annulled}</span>
      </div>

      <ul class="todo-list" data-list>
        ${
          loading
            ? `<li class="empty">Cargando tareas...</li>`
            : todos.length > 0
              ? todos
                  .map(
                    (todo) => `
                      <li class="todo-item ${todo.done ? 'done' : ''} ${todo.annulled ? 'annulled' : ''}" data-id="${todo.id}">
                        <div class="todo-main">
                          <label class="todo-label">
                            <input
                              type="checkbox"
                              ${todo.done ? 'checked' : ''}
                              ${todo.annulled ? 'disabled' : ''}
                              data-id="${todo.id}"
                            />
                            <span class="todo-text">${todo.description}</span>
                          </label>

                          ${
                            todo.annulled
                              ? `
                                <div class="todo-note">
                                  <span class="todo-badge">Anulada</span>
                                  <p class="todo-reason">Motivo: ${todo.annulReason}</p>
                                </div>
                              `
                              : ''
                          }
                        </div>

                        <div class="todo-actions">
                          <button
                            type="button"
                            class="todo-btn todo-btn--ghost"
                            data-action="edit"
                            ${todo.annulled ? 'disabled' : ''}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            class="todo-btn todo-btn--warn"
                            data-action="annul"
                            ${todo.annulled ? 'disabled' : ''}
                          >
                            Anular
                          </button>

                          <button
                            type="button"
                            class="todo-btn todo-btn--danger"
                            data-action="delete"
                            ${todo.annulled ? 'disabled' : ''}
                          >
                            Eliminar
                          </button>
                        </div>
                      </li>
                    `
                  )
                  .join('')
              : `<li class="empty">No hay tareas registradas.</li>`
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

  list.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button || button.disabled) return;

    const item = button.closest('[data-id]');
    if (!item) return;

    const { id } = item.dataset;
    const action = button.dataset.action;

    if (action === 'edit') {
      const current = todos.find((todo) => todo.id === id);
      if (!current || current.annulled) return;

      const newDescription = window.prompt('Editar tarea:', current.description);
      if (newDescription === null) return;

      onEdit(id, newDescription);
    }

    if (action === 'delete') {
      const ok = window.confirm('¿Seguro que deseas eliminar esta tarea?');
      if (!ok) return;

      onDelete(id);
    }

    if (action === 'annul') {
      const reason = window.prompt('Escribe el motivo por el que anulas esta tarea:');
      if (reason === null) return;

      onAnnul(id, reason);
    }
  });
};