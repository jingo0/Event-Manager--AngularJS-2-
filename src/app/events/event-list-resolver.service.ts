import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { EventService } from './shared/events.service'

@Injectable()
export class EventListResolver implements Resolve<any> 
{
    constructor(private eventService:EventService)
    {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.eventService.getEvents()
    }
}