import {Component, OnInit} from '@angular/core';
import {BookmarkService} from '../shared/bookmark.service';
import {BookmarkModel} from '../shared/bookmark.model';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {NotificationService} from "../shared/notification.service";

@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.component.html',
  styleUrls: ['./edit-bookmark.component.scss']
})
export class EditBookmarkComponent implements OnInit {

  constructor(
    private bookmarkService: BookmarkService,
    private router: ActivatedRoute,
    private route: Router,
    private notificationService: NotificationService) {
  }

  showValidationErrors = false;
  bookmark?: BookmarkModel;

  ngOnInit(): void {
    this.router.paramMap.subscribe((paramMap: ParamMap) => {
      const bookmarkId = paramMap.get('id');
      this.bookmark = this.bookmarkService.getBookmark(bookmarkId)
    })
  }

  onFormSubmit(form: NgForm) {
    const {name, url} = form.value
    // @ts-ignore
    this.bookmarkService.updateBookmark(this.bookmark.id, {
      name,
      url: new URL(url)
    })

    this.notificationService.show("Página de favoritos atualizada!")
  }

  delete() {
    this.bookmarkService.deleteBookmark(this.bookmark!.id!);
    this.route.navigate(['../'], {relativeTo: this.router})
    this.notificationService.show("Item deletado da página de favoritos!")

  }

}
