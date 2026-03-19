# Mini App de Tareas - Vite

Aplicación web desarrollada con JavaScript Vanilla utilizando Vite como herramienta de desarrollo.

Permite gestionar tareas con funcionalidades como crear, completar, eliminar y persistir datos en el navegador mediante localStorage.

---

## Demo

https://AriusJoel1.github.io/mi-tareas/

---

## Características

- Crear nuevas tareas
- Marcar y desmarcar tareas como completadas
- Eliminar tareas
- Persistencia de datos con localStorage
- Renderizado dinámico del DOM
- Arquitectura modular

---

## Tecnologías utilizadas

- JavaScript (ES6+)
- Vite
- HTML5
- CSS3

---

## Estructura del proyecto
mi-tareas/
├─ node_modules/
├─ public/
├─ src/
│ ├─ todos/
│ │ ├─ models/
│ │ │ └─ todo.model.js
│ │ ├─ store/
│ │ │ └─ todo.store.js
│ │ └─ use-cases/
│ │ └─ render-todos.js
│ ├─ main.js
│ └─ style.css
├─ index.html
├─ package.json
├─ vite.config.js


---

## Instalación y uso

1. Clonar el repositorio
```bash
git clone https://github.com/AriusJoel1/mi-tareas.git
```

## 2. Ingresar al proyecto

```bash
cd mi-tareas
```

## 3. Instalar dependencias

```bash
npm install
```

## 4. Ejecutar en desarrollo

```bash
npm run dev
```


## Build y despliegue

Generar versión de producción:

```bash
npm run build
```

Desplegar en GitHub Pages:

```bash
npm run deploy
```