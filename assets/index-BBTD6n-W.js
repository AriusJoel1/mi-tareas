(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{constructor({id:e,description:t,done:n=!1}){this.id=e,this.description=t,this.done=n}},t=()=>new Promise(t=>{setTimeout(()=>{t([new e({id:crypto.randomUUID(),description:`Aprender módulos en Vite`,done:!1}),new e({id:crypto.randomUUID(),description:`Crear un store centralizado`,done:!0}),new e({id:crypto.randomUUID(),description:`Renderizar tareas en el DOM`,done:!1})])},1200)}),n=new class{constructor(){this.todos=[],this.listeners=[]}async init(){this.todos=await t(),this.notify()}getTodos(){return[...this.todos]}subscribe(e){return this.listeners.push(e),e(this.getTodos()),()=>{this.listeners=this.listeners.filter(t=>t!==e)}}notify(){let e=this.getTodos();this.listeners.forEach(t=>t(e))}addTodo(t){this.todos=[new e({id:crypto.randomUUID(),description:t,done:!1}),...this.todos],this.notify()}toggleTodo(t){this.todos=this.todos.map(n=>n.id===t?new e({id:n.id,description:n.description,done:!n.done}):n),this.notify()}},r=(e,t,{onAdd:n,onToggle:r})=>{e.innerHTML=`
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
        <span>Pendientes: ${t.filter(e=>!e.done).length}</span>
        <span>Completadas: ${t.filter(e=>e.done).length}</span>
      </div>

      <ul class="todo-list" data-list>
        ${t.length>0?t.map(e=>`
                    <li class="todo-item ${e.done?`done`:``}">
                      <label>
                        <input
                          type="checkbox"
                          ${e.done?`checked`:``}
                          data-id="${e.id}"
                        />
                        <span>${e.description}</span>
                      </label>
                    </li>
                  `).join(``):`<li class="empty">Cargando tareas...</li>`}
      </ul>
    </section>
  `;let i=e.querySelector(`[data-form]`),a=e.querySelector(`[data-input]`),o=e.querySelector(`[data-list]`);i.addEventListener(`submit`,e=>{e.preventDefault();let t=a.value.trim();t&&(n(t),i.reset(),a.focus())}),o.addEventListener(`change`,e=>{let t=e.target;t.matches(`input[type="checkbox"][data-id]`)&&r(t.dataset.id)})},i=document.querySelector(`#app`);n.subscribe(e=>{r(i,e,{onAdd:e=>{n.addTodo(e)},onToggle:e=>{n.toggleTodo(e)}})}),(async()=>{await n.init()})();