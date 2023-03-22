import { Component, HostListener, Input, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { EventService, IEvent, ISession } from '../events';
import { AuthService } from '../user/auth.service';

@Component({
    selector: 'nav-bar',
    templateUrl: `./navbar.component.html`,
    styles: [`
        .nav.navbar-nav {font-size: 15px;}
        #searchForm {margin-right: 100px;}
        @media (max-width: 1200px) {#searchForm {display:none}}
        li > a.active {color:orange;}
    `]
})

export class NavBarComponent implements OnInit
{
    public events!: any[];
    searchTerm!: any;
    foundSessions!: ISession[]
    private unsubscribe$: Subject<void> = new Subject();
    constructor(public authServ:AuthService, private eventService: EventService, private route:ActivatedRoute)
    {
    }

    searchSessions(searchTerm:string)
    {
        this.eventService.searchSessions(searchTerm).subscribe(
            (sessions:any) => this.foundSessions = sessions)
    }

    ngOnInit() 
    {
        console.log("ngOnIntit called")
        this.eventService.getEvents()
          .subscribe(events => this.events = events);
    }

    @HostListener("click") onClick(){
        
        this.eventService.getEvents().subscribe(events => this.events = events);
      }
    
}