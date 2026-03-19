export class Todo {
  constructor({
    id,
    description,
    done = false,
    annulled = false,
    annulReason = '',
    annulledAt = null,
  }) {
    this.id = id;
    this.description = description;
    this.done = done;
    this.annulled = annulled;
    this.annulReason = annulReason;
    this.annulledAt = annulledAt;
  }
}