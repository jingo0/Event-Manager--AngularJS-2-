import { Component, Input , OnChanges } from "@angular/core";
import { AuthService } from "src/app/user/auth.service";
import { ISession } from "../shared/index";
import { VoterService } from "./voter.service";

@Component({
    selector: 'session-list',
    templateUrl:`./session-list.component.html`
})

export class SessionListComponent implements OnChanges
{    
    @Input() sessions! : ISession[];
    @Input() filterBy! :string ;
    @Input() sortBySessionList! : string;
    @Input() eventId! : number;

    visibleSession:ISession[] = [];

    constructor(public auth:AuthService, private voterService:VoterService)
    {}

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

    userHasVoted(session: ISession): boolean 
    {
        return this.voterService.userHasVoted(session, this.auth.currentUser.userName)
    }

    toggleVote(session: ISession) 
    {
        if(this.userHasVoted(session))
        {
            this.voterService.deleteVoter(this.eventId, session, this.auth.currentUser.userName)
        }
        else 
        {
            this.voterService.addVoter(this.eventId, session, this.auth.currentUser.userName)
        }

        if(this.sortBySessionList==='votes')
        {
            this.visibleSession.sort(sortByVotes)
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