import {Component, OnInit} from '@angular/core';
import {TodoModel} from "../shared/todo.model";
import {TodoService} from "../shared/todo.service";
import {Router} from '@angular/router';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  animations: [
    trigger('todoItemAnim', [
      transition(':leave', [
        animate(550, style({
          opacity: 0,
          height: 0,
          marginBottom: 0
        }))
      ])
    ])
  ]
})

export class TodosComponent implements OnInit {


  todos: TodoModel[] = [];

  constructor(private todoService: TodoService, private router: Router) {
  }

  ngOnInit(): void {
    this.todos = this.todoService.getTodos()
  }

  toggleCompleted(todo: TodoModel) {
    this.todoService.updateTodo(<string>todo.id, {completed: !todo.completed})
  }

  onEditClick(todo: TodoModel) {
    this.router.navigate(['/todos', todo.id])
  }

  onDeleteClick(todo: TodoModel) {
    this.todoService.deleteTodo(todo.id)
  }

  trackById(index: any, item: TodoModel) {
    return item.id
  }

}
