import {Injectable, OnDestroy} from '@angular/core';
import {TodoModel} from "./todo.model";
import {fromEvent, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodoService implements OnDestroy {

  todos: TodoModel[] = []

  storageListenSub: Subscription

  constructor() {
    this.loadState()

    this.storageListenSub = fromEvent(window, 'storage')
      .subscribe((event) => {
        // @ts-ignore
        if (event['key'] === "todos") this.loadState();
      })
  }

  ngOnDestroy() {
    if (this.storageListenSub) this.storageListenSub.unsubscribe();
  }

  getTodos() {
    return this.todos
  }


  getTodo(id: string | undefined) {

    return this.todos.find(t => t.id === id)
  }

  addTodo(todo: TodoModel) {
    this.todos.push(todo)
    this.saveState();
  }

  updateTodo(id: string | undefined, updatedTodoFields: Partial<TodoModel>) {
    const todo = this.getTodo(id)
    Object.assign(todo, updatedTodoFields)
    this.saveState();
  }

  deleteTodo(id: string | undefined) {
    const index = this.todos.findIndex(t => t.id === id)
    if (index == -1) return

    this.todos.splice(index, 1)

    this.saveState();
  }

  saveState() {
    localStorage.setItem("todos", JSON.stringify(this.todos))

  }

  loadState() {
    try {
      const todosInStorage = JSON.parse(<string>localStorage.getItem("todos"))
      this.todos.length = 0 //clear todos array (while keeping the reference)
      this.todos.push(...todosInStorage);
    } catch (e) {
      console.log("Erro ao recuperar informação do local storage")
      console.log(e)
    }
  }

}
