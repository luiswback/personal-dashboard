import { Component, OnInit } from '@angular/core';
import {NoteModel} from "../shared/note.model";
import {NoteService} from "../shared/note.service";


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes: NoteModel[] = [];

  constructor(private noteService: NoteService) {

  }

  ngOnInit(): void {
    this.notes = this.noteService.getNotes();
  }

}
