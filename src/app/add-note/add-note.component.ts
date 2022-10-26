import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {NoteModel} from "../shared/note.model";
import {NoteService} from "../shared/note.service";
import {Router} from "@angular/router";
import {NotificationService} from "../shared/notification.service";

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

  showValidationErrors: boolean = false;

  constructor(private noteService: NoteService, private router: Router, private notificationService:NotificationService) {
  }

  ngOnInit(): void {

  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) {
      return this.showValidationErrors = true;
    }

    const note = new NoteModel(form.value.title, form.value.content)
    this.noteService.addNotes(note)
    this.notificationService.show('Anotação criada com sucesso');
    return this.router.navigateByUrl("/notes");
  }


}
