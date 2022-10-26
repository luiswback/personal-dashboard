import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NoteModel} from "../shared/note.model";

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {


  @Input() note!: NoteModel

  constructor() { }

  ngOnInit(): void {

  }




}
