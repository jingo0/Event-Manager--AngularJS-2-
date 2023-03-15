import { Component, Input , OnChanges, SimpleChanges} from "@angular/core";
import { ISession } from "../shared/index";

@Component({
    selector: 'session-list',
    templateUrl:`./session-list.component.html`
})

export class SessionListComponent implements OnChanges{
    
    @Input() sessions! : ISession[];
    @Input() filterBy :string ='all';
    visibleSession:ISession[] = [];

    ngOnChanges() {
        if(this.sessions)
        {
            console.log(this.filterBy)
            this.filterSession(this.filterBy);
        }
    }

    filterSession(filter: string)
    {
        if(filter==='all')
        {
            this.visibleSession = this.sessions.slice(0);
        }
        else
        {
            this.visibleSession = this.sessions.filter( s => {
                return s.level.toLocaleLowerCase() === filter;
            })
        }
    }

}