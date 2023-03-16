import { Component} from '@angular/core'
import { EventService } from '../shared/events.service'
import { ActivatedRoute, Params} from '@angular/router'
import { ISession } from '../shared'

@Component({
    templateUrl: './event-details.component.html',
    styles: [
        `.container { padding-left:20px; padding-right:20px;}
        .event-image{ height: 100px; }
        a {cursor:pointer;margin: 'left';}`
    ]
})

export class EventDetailsComponent 
{
    event:any
    addMode!: boolean
    filterBy: string = 'all';
    sortByEventDetails: string = 'name';
    constructor(private eventService: EventService, private route:ActivatedRoute){}
    
    ngOnInit()
    {
        this.route.params.forEach((params: Params) => {
            this.event = this.eventService.getEvent(+params['id'])
            this.addMode = false
        })
    }

    addSession()
    {
        this.addMode = true
    }

    saveNewSession(session: ISession)
    {

        const nextId = Math.max.apply(null, this.event.sessions.map((s:any) => s.id));

        session.id = nextId+1
        this.event.sessions.push(session)
        this.eventService.updateEvent(this.event)
        this.addMode=false
    }

    cancelAddSession()
    {
        this.addMode = false
    }
}