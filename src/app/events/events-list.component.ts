import { Component } from "@angular/core";
import { EventService } from "./shared/events.service";
import { TaoastrService } from "../common/toastr.service";
import { ActivatedRoute } from "@angular/router";
import { IEvent } from "./shared/index";


@Component({
    template: `
    <div>
        <h1>Upcoming Angular Events</h1>
        <hr/>
        <div class="row">
            <div class="col-md-5" *ngFor="let event of events">
                <event-thumbnail (click)="handleThumbnailClick(event.name)" [event]="event" ></event-thumbnail>
            </div>
        </div>
    </div>
    `,
    
})


export class EventListComponent 
{
    
    constructor(private eventService: EventService, private toastr: TaoastrService, private route:ActivatedRoute)
    {
      
    }
    events: IEvent[] = [];
    
    ngOnInit()
    {
      this.events = this.route.snapshot.data['events']
    }

    handleThumbnailClick(eventName: any)
    {
      this.toastr.success(eventName)
    }
}