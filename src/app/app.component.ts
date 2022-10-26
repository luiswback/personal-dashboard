import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {animate, group, query, style, transition, trigger} from "@angular/animations";
import {map, Observable, timer} from "rxjs";


const baseStyles = style({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
})

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnim', [
      transition(':increment', [

        query(':enter, :leave', [
          baseStyles
        ], {optional: true}),


        //makes one leave while the other appear
        group([
          query(':leave', [
            animate('300ms ease-in', style({
              opacity: 0,
              transform: 'translateX(-60px)'
            }))
          ], {optional: true}),

          query(':enter', [
            style({
              opacity: 0,
              transform: 'translateX(60px)'
            }),
            animate('300ms 100ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0)'
            }))
          ], {optional: true})

        ])
      ]),

      //SAME ANIMATION BUT INVERTING THE TRANSLATE-X ( using decrement property )

      transition(':decrement', [
        query(':enter, :leave', [
          baseStyles
        ], {optional: true}),


        //makes one leave while the other appear
        group([
          query(':leave', [
            animate('300ms ease-in', style({
              opacity: 0,
              transform: 'translateX(60px)'
            }))
          ], {optional: true}),

          query(':enter', [
            style({
              opacity: 0,
              transform: 'translateX(-60px)'
            }),
            animate('300ms 100ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0)'
            }))
          ], {optional: true})
        ])
      ]),

      transition('* => secundary', [

        query(':enter, :leave', [
          baseStyles
        ], {optional: true}),

        group([
          query(':leave', [
            animate('300ms ease-in', style({
              opacity: 0,
              transform: 'scale(0.8)'
            }))
          ], {optional: true}),

          query(':enter', [
            style({
              opacity: 0,
              transform: 'scale(1.2)'
            }),
            animate('300ms 100ms ease-out', style({
              opacity: 1,
              transform: 'scale(1)'
            }))
          ], {optional: true})
        ])
      ]),

      transition('secundary => *', [

        query(':enter, :leave', [
          baseStyles
        ], {optional: true}),

        group([
          query(':leave', [
            animate('300ms ease-in', style({
              opacity: 0,
              transform: 'scale(1.25)'
            }))
          ], {optional: true}),

          query(':enter', [
            style({
              opacity: 0,
              transform: 'scale(0.8)'
            }),
            animate('300ms 100ms ease-out', style({
              opacity: 1,
              transform: 'scale(1)'
            }))
          ], {optional: true})
        ])
      ]),

    ]),
    trigger('bgAnim', [
      transition(':leave', animate(1000, style({
        opacity: 0
      })))
    ]),
    trigger('fadeAnim', [
      transition(':enter', [
        style({opacity: 0}),
        animate(300, style({
          opacity: 1
        }))
      ]),
      transition(':leave', [
        animate(250, style({opacity: 0}))
      ])
    ])
  ]
})
export class AppComponent implements OnInit{

  backgrounds: string[] = ['https://images.unsplash.com/photo-1666688832727-0f5dfb2b50c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80']
  loadingBgImage: boolean = false

  dateTime?: Observable<Date>
  ngOnInit() {
    this.dateTime = timer(0, 1000).pipe(
      map(() =>{
        return new Date();
      })

    )

  }


  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) {
      const tab = outlet.activatedRouteData['tab']
      if (!tab) return 'secundary'
      return tab
    }
  }

  async changeBgImage(): Promise<any> {
    this.loadingBgImage = true
    const result = await fetch('https://source.unsplash.com/random/1920x1080', {
      method: 'HEAD'
    })

    const alreadyGot = this.backgrounds.includes(result.url)
    if (alreadyGot) {
      //this is the same image as we currently have, so re-run the function to get another image
      return this.changeBgImage()
    }


    this.backgrounds.push(result.url)
  }

  onBgImageLoad(imgEvent: Event) {
    //BG image has loaded, now remove the old BG image from the backgrounds array
    const imgElement = imgEvent.target as HTMLImageElement
    const src = imgElement.src
    this.backgrounds = this.backgrounds.filter(b => b === src)
    this.loadingBgImage = false;
  }
}





