import { Injectable } from '@angular/core'
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router'
import { EventService } from '../shared/events.service'
@Injectable()
export class EventRouteActivator implements CanActivate
{
    constructor(private eventService:EventService, private router:Router){
        
    }

    canActivate(route:ActivatedRouteSnapshot):any
    {
        const eventExists = this.eventService.getEvent(+route.params['id'])
        if(!eventExists)
        {
            this.router.navigate(['/404'])
        }
        return eventExists
    }
}