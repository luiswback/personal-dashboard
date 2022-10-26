import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../shared/notification.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {NotificationDataModel} from "../shared/notification-data.model";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('notificationAnim', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(5px)'
        }),
        animate('150ms 125ms ease-out')
      ]),
      transition(':leave', [
        animate(125, style({
          opacity: 0,
          transform: 'scale(0.5)'
        }))
      ])
    ])
  ]
})
export class NotificationComponent implements OnInit {

  notification?: NotificationDataModel[];

  timeout: any;

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit(): void {


    this.notificationService.notifications.subscribe((notification: NotificationDataModel) => {
      this.notification = Array(notification);
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.notification = [];
      }, notification.duration)
    })
  }

}
