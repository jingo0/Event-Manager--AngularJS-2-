import { SessionListComponent } from "./session-list.component";
import { ISession } from "../shared";
import { AuthService } from "src/app/user/auth.service";
import { VoterService } from "./voter.service";

describe('SessionListComponent', ()=>{
    let component: SessionListComponent;
    let mockAuthService: AuthService, mockVoterService: VoterService

    beforeEach(() => {
        component = new SessionListComponent(mockAuthService, mockVoterService)
    })

    describe('ngOnChanges', () => {
        it('should filter the sessions correctly', () => {
            component.sessions = <ISession[]>[
                {name: 'session 1', level: 'intermediate'},
                {name: 'session 2', level: 'intermediate'},
                {name: 'session 3', level: 'beginner'}
            ]
            component.filterBy = 'intermediate';
            component.sortBySessionList = 'name';
            component.eventId = 3;

            component.ngOnChanges();

            expect(component.visibleSession.length).toBe(2)

        })

        it('should sort the sessions correctly', () => {
            component.sessions = <ISession[]>[
                {name: 'session 1', level: 'intermediate'},
                {name: 'session 3', level: 'beginner'},
                {name: 'session 2', level: 'intermediate'},
                
            ]
            component.filterBy = 'all';
            component.sortBySessionList = 'name';
            component.eventId = 3;

            component.ngOnChanges();

            expect(component.visibleSession[2].name).toBe('session 3');

        })

    })
})