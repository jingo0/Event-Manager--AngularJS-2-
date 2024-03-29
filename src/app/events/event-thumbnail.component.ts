import { Component, Input } from '@angular/core'
import { IEvent} from './shared/index'

@Component({
    selector: 'event-thumbnail',
    template:`
    <div [routerLink]="['/events', event?.id]" class="well hoverwell thumbnail">
        <h2>{{event?.name}}</h2>
        <div>Date: {{event?.date | date:'shortDate'}} </div>
        <div [ngClass]="getStartTimeClass()" [ngSwitch]="event?.time">
            Time: {{event?.time}} 
            <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
            <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
            <span *ngSwitchDefault>(Normal Start)</span>
        </div>
        <div>Price: {{event?.price | currency:'USD'}} </div>
        <!-- can use [hidden]="!event.location" instead of ngIf-->
        <div *ngIf="event?.location">
            <span>Location:{{event?.location?.address}}</span>
            <span class="pad-left">{{event?.location?.city}}, {{event?.location?.country}}</span>
        </div>
        <div *ngIf="event?.onlineUrl">
            Online URL: {{event?.onlineUrl}}
        </div>
    </div>
    `,
    styles:[
        `.pad-left {margin-left:7px;}
        .thumbnail {min-height: 238px;}
        .green {color: #003300 !important;}
        .bold {font-weight: bold; }
        `
    ]
})

export class EventThumbnailComponent 
{
   @Input() event:IEvent | undefined

   getStartTimeClass()
   {
    const isEarlyStart = this.event && this.event.time === '8:00 am'
    return {green: isEarlyStart, bold:isEarlyStart}
   }
   
}