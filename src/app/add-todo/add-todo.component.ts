import {Component, OnInit} from '@angular/core';
import {TodoService} from '../shared/todo.service';
import {NgForm} from '@angular/forms';
import {TodoModel} from '../shared/todo.model';
import {Router} from '@angular/router';
import {NotificationService} from "../shared/notification.service";

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {


  showValidationErrors: boolean = false;

  constructor(private todoService: TodoService,
              private router: Router,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) return this.showValidationErrors = true;
    const todo = new TodoModel(form.value.text)
    this.todoService.addTodo(todo)
    this.notificationService.show("Nova tarefa criada com sucesso")
    return this.router.navigateByUrl('/todos')
  }


}
