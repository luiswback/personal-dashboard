import {Component, OnInit} from '@angular/core';
import {BookmarkModel} from '../shared/bookmark.model';
import {BookmarkService} from '../shared/bookmark.service';

@Component({
  selector: 'app-manage-bookmarks',
  templateUrl: './manage-bookmarks.component.html',
  styleUrls: ['./manage-bookmarks.component.scss']
})
export class ManageBookmarksComponent implements OnInit {

  bookmarks: BookmarkModel[] = [];

  constructor(private bookmarkService: BookmarkService) {
  }

  ngOnInit(): void {
    this.bookmarks = this.bookmarkService.getBookmarks()
  }

}
