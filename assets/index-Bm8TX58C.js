(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{constructor({id:e,description:t,done:n=!1,annulled:r=!1,annulReason:i=``,annulledAt:a=null}){this.id=e,this.description=t,this.done=n,this.annulled=r,this.annulReason=i,this.annulledAt=a}},t=`mini-app-tareas-v1`,n=()=>new Promise(t=>{setTimeout(()=>{t([new e({id:crypto.randomUUID(),description:`Aprender módulos en Vite`,done:!1}),new e({id:crypto.randomUUID(),description:`Crear un store centralizado`,done:!0}),new e({id:crypto.randomUUID(),description:`Renderizar tareas en el DOM`,done:!1})])},1200)}),r=new class{constructor(){this.todos=[],this.listeners=[],this.loading=!0,this.initialized=!1}getState(){return{todos:[...this.todos],loading:this.loading}}subscribe(e){return this.listeners.push(e),e(this.getState()),()=>{this.listeners=this.listeners.filter(t=>t!==e)}}notify(){let e=this.getState();this.listeners.forEach(t=>t(e))}readFromStorage(){try{let n=localStorage.getItem(t);if(!n)return null;let r=JSON.parse(n);return Array.isArray(r)?r.map(t=>new e(t)):null}catch{return null}}persist(){localStorage.setItem(t,JSON.stringify(this.todos))}async init(){if(this.initialized)return;this.initialized=!0;let e=this.readFromStorage();if(e&&e.length>0){this.todos=e,this.loading=!1,this.notify();return}this.todos=await n(),this.loading=!1,this.persist(),this.notify()}addTodo(t){let n=t.trim();n&&(this.todos=[new e({id:crypto.randomUUID(),description:n,done:!1}),...this.todos],this.persist(),this.notify())}toggleTodo(t){this.todos=this.todos.map(n=>n.id!==t||n.annulled?n:new e({id:n.id,description:n.description,done:!n.done,annulled:n.annulled,annulReason:n.annulReason,annulledAt:n.annulledAt})),this.persist(),this.notify()}editTodo(t,n){let r=n.trim();r&&(this.todos=this.todos.map(n=>n.id!==t||n.annulled?n:new e({id:n.id,description:r,done:n.done,annulled:n.annulled,annulReason:n.annulReason,annulledAt:n.annulledAt})),this.persist(),this.notify())}deleteTodo(e){this.todos=this.todos.filter(t=>t.id!==e),this.persist(),this.notify()}annulTodo(t,n){let r=n.trim();r&&(this.todos=this.todos.map(n=>n.id!==t||n.annulled?n:new e({id:n.id,description:n.description,done:!1,annulled:!0,annulReason:r,annulledAt:new Date().toISOString()})),this.persist(),this.notify())}},i=(e,{todos:t,loading:n},{onAdd:r,onToggle:i,onEdit:a,onDelete:o,onAnnul:s})=>{let c=t.filter(e=>!e.annulled),l=c.filter(e=>!e.done).length,u=c.filter(e=>e.done).length,d=t.filter(e=>e.annulled).length;e.innerHTML=`
    <section class="app">
      <h1>Mini App de Tareas</h1>

      <form class="todo-form" data-form>
        <input
          type="text"
          placeholder="Escribe una tarea..."
          class="todo-input"
          data-input
          autocomplete="off"
          ${n?`disabled`:``}
        />
        <button type="submit" class="todo-button" ${n?`disabled`:``}>
          Agregar
        </button>
      </form>

      <div class="stats">
        <span>Pendientes: ${l}</span>
        <span>Completadas: ${u}</span>
        <span>Anuladas: ${d}</span>
      </div>

      <ul class="todo-list" data-list>
        ${n?`<li class="empty">Cargando tareas...</li>`:t.length>0?t.map(e=>`
                      <li class="todo-item ${e.done?`done`:``} ${e.annulled?`annulled`:``}" data-id="${e.id}">
                        <div class="todo-main">
                          <label class="todo-label">
                            <input
                              type="checkbox"
                              ${e.done?`checked`:``}
                              ${e.annulled?`disabled`:``}
                              data-id="${e.id}"
                            />
                            <span class="todo-text">${e.description}</span>
                          </label>

                          ${e.annulled?`
                                <div class="todo-note">
                                  <span class="todo-badge">Anulada</span>
                                  <p class="todo-reason">Motivo: ${e.annulReason}</p>
                                </div>
                              `:``}
                        </div>

                        <div class="todo-actions">
                          <button
                            type="button"
                            class="todo-btn todo-btn--ghost"
                            data-action="edit"
                            ${e.annulled?`disabled`:``}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            class="todo-btn todo-btn--warn"
                            data-action="annul"
                            ${e.annulled?`disabled`:``}
                          >
                            Anular
                          </button>

                          <button
                            type="button"
                            class="todo-btn todo-btn--danger"
                            data-action="delete"
                          >
                            Eliminar
                          </button>
                        </div>
                      </li>
                    `).join(``):`<li class="empty">No hay tareas registradas.</li>`}
      </ul>
    </section>
  `;let f=e.querySelector(`[data-form]`),p=e.querySelector(`[data-input]`),m=e.querySelector(`[data-list]`);f.addEventListener(`submit`,e=>{e.preventDefault();let t=p.value.trim();t&&(r(t),f.reset(),p.focus())}),m.addEventListener(`change`,e=>{let t=e.target;t.matches(`input[type="checkbox"][data-id]`)&&i(t.dataset.id)}),m.addEventListener(`click`,e=>{let n=e.target.closest(`button[data-action]`);if(!n||n.disabled)return;let r=n.closest(`[data-id]`);if(!r)return;let{id:i}=r.dataset,c=n.dataset.action;if(c===`edit`){let e=t.find(e=>e.id===i);if(!e||e.annulled)return;let n=window.prompt(`Editar tarea:`,e.description);if(n===null)return;a(i,n)}if(c===`delete`){if(!window.confirm(`¿Seguro que deseas eliminar esta tarea?`))return;o(i)}if(c===`annul`){let e=window.prompt(`Escribe el motivo por el que anulas esta tarea:`);if(e===null)return;s(i,e)}})},a=document.querySelector(`#app`);r.subscribe(e=>{i(a,e,{onAdd:e=>r.addTodo(e),onToggle:e=>r.toggleTodo(e),onEdit:(e,t)=>r.editTodo(e,t),onDelete:e=>r.deleteTodo(e),onAnnul:(e,t)=>r.annulTodo(e,t)})}),r.init();