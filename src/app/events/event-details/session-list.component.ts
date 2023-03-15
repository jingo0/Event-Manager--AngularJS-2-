import { Component, Input , OnChanges } from "@angular/core";
import { ISession } from "../shared/index";

@Component({
    selector: 'session-list',
    templateUrl:`./session-list.component.html`
})

export class SessionListComponent implements OnChanges{
    
    @Input() sessions! : ISession[];
    @Input() filterBy! :string ;
    @Input() sortBySessionList! : string;

    visibleSession:ISession[] = [];

    ngOnChanges() {
        if(this.sessions)
        {
            this.filterSession(this.filterBy);
            this.sortBySessionList === 'name' ? this.visibleSession.sort(sortByName) : this.visibleSession.sort(sortByVotes)
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

function sortByName(s1: ISession, s2:ISession)
{
    if(s1.name > s2.name) return 1
    else if(s1.name === s2.name) return 0
    else return -1
}

function sortByVotes(s1: ISession, s2:ISession)
{
    return s2.voters.length - s1.voters.length
}