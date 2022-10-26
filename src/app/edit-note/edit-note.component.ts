import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {NoteService} from "../shared/note.service";
import {NoteModel} from "../shared/note.model";
import {NgForm} from "@angular/forms";
import {NotificationService} from "../shared/notification.service";

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {

  note: NoteModel | undefined
  showValidationErrors = false;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private router: Router,
    private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const idParam = paramMap.get('id');
      this.note = this.noteService.getNote(idParam)
    })
  }

  onFormSubmit(form: NgForm) {

    if (form.invalid) {
      return this.showValidationErrors = true;
    }

    this.noteService.updateNotes(this.note!.id, form.value)
    this.router.navigateByUrl("/notes")

    return this.notificationService.show("Anotação atualizada");
  }

  deleteNote() {
    this.noteService.deleteNote(this.note!.id)
    this.router.navigateByUrl("/notes")

    this.notificationService.show("Anotação excluída com sucesso");

  }


}
