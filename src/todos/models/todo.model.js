export class Todo {
  constructor({ id, description, done = false }) {
    this.id = id;
    this.description = description;
    this.done = done;
  }
}