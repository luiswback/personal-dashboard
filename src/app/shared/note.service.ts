import {Injectable, OnDestroy} from '@angular/core';
import {NoteModel} from "./note.model";
import {fromEvent, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NoteService implements OnDestroy{

  notes: NoteModel[] = [];

  storageListenSub: Subscription;

  constructor() {
    this.loadState()


    this.storageListenSub = fromEvent(window, 'storage')
      .subscribe((event) =>{
     // @ts-ignore
      if (event['key'] === "notes") this.loadState();
    })
  }

  ngOnDestroy() {
    if (this.storageListenSub) this.storageListenSub.unsubscribe();
  }

  getNotes() {
    return this.notes
  }

  getNote(id: string | null): NoteModel | undefined {
    return this.notes.find(n => n.id === id)
  }

  addNotes(note: NoteModel) {
    this.notes.push(note)
    this.saveState()
  }

  updateNotes(id: string, updatedFields: Partial<NoteModel>) {
    const note = this.getNote(id)
    Object.assign(note, updatedFields)
    this.saveState()

  }

  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex(n => n.id == id);
    if (noteIndex == -1) return;
    this.notes.splice(noteIndex, 1)
    this.saveState()
  }

  saveState() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  loadState() {
    try {
      const notesInStorage = JSON.parse(<string>localStorage.getItem("notes"));
      this.notes.length = 0 //clear the notes array (while keeping the reference
      this.notes.push(...notesInStorage)
    } catch (e) {
      console.log("Erro ao recuperar informação do local storage")
      console.log(e)
    }

  }
}
