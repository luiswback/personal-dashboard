import {Component, Input, OnInit} from '@angular/core';
import {BookmarkModel} from '../shared/bookmark.model';

@Component({
  selector: 'app-bookmark-tile',
  templateUrl: './bookmark-tile.component.html',
  styleUrls: ['./bookmark-tile.component.scss']
})
export class BookmarkTileComponent implements OnInit {

  @Input() bookmark?: BookmarkModel

  faviconError:boolean = false;

  tileIconSrc?: string;

  constructor() { }

  ngOnInit(): void {
    this.tileIconSrc = this.bookmark?.url?.origin + '/favicon.ico'
  }

}
