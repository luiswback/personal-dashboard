import {Injectable, OnDestroy} from '@angular/core';
import {BookmarkModel} from './bookmark.model';
import {NoteModel} from './note.model';
import {fromEvent, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookmarkService implements OnDestroy {

  bookmarks: BookmarkModel[] = []

  storageListenSub: Subscription

  constructor() {
    this.loadState()

    this.storageListenSub = fromEvent(window, 'storage')
      .subscribe((event) => {
        // @ts-ignore
        if (event['key'] === "bookmarks") this.loadState();
      })
  }

  ngOnDestroy() {
    if (this.storageListenSub) this.storageListenSub.unsubscribe();
  }

  getBookmarks() {
    return this.bookmarks
  }

  getBookmark(id: string | null) {
    return this.bookmarks.find(b => b.id === id)
  }

  addBookmark(bookmark: BookmarkModel) {
    this.bookmarks.push(bookmark)
    this.saveState();
  }

  updateBookmark(id: string, updatedFields: Partial<NoteModel>) {
    const bookmark = this.getBookmark(id)
    Object.assign(bookmark, updatedFields)
    this.saveState();
  }

  deleteBookmark(id: string) {
    const bookmarkIndex = this.bookmarks.findIndex(b => b.id === id)
    if (bookmarkIndex == -1) return;
    this.bookmarks.splice(bookmarkIndex, 1)
    this.saveState();
  }

  saveState() {
    localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks))
  }

  loadState() {
    try {
      const bookmarksInStorage = JSON.parse(<string>localStorage.getItem('bookmarks'), (key, value) => {
        if (key == 'url') return new URL(value);
        return value
      })

      this.bookmarks.length = 0 //clear the bookmarks array (while keeping the reference)
      this.bookmarks.push(...bookmarksInStorage)
    } catch (e) {
      console.log("Ocorreu um erro ao trazer as informações do local storage")
      console.log(e)
    }
  }

}
