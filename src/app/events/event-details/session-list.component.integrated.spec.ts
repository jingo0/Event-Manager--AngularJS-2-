import { SessionListComponent } from "./session-list.component"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { DebugElement, NO_ERRORS_SCHEMA } from "@angular/core"
import { AuthService } from "src/app/user/auth.service"
import { VoterService } from "./voter.service"
import { DurationPipe } from "../shared"
import { CollapsibleWellComponent } from "./collapsible-well.component"
import { upvoteComponent } from "./upvote.component"
import { By } from "@angular/platform-browser"
 
describe('SessionListComponent', () => {

    let mockAuthService: any, 
    mockVoterService: any, 
    fixture: ComponentFixture<SessionListComponent>,
    component: SessionListComponent,
    element!: HTMLElement,
    debugEL: DebugElement

    beforeEach(() => {
        mockAuthService = { isAuthenticated: () => true, currentUser: { userName: 'Joe'}}
        mockVoterService = { userHasVoted: () => true}
        TestBed.configureTestingModule({
            declarations: [
                SessionListComponent,
                DurationPipe,
                CollapsibleWellComponent,
                upvoteComponent
            ],
            providers: [
                { provide: AuthService, useValue: mockAuthService},
                { provide : VoterService, useValue: mockVoterService}
            ],
             schemas: [
                NO_ERRORS_SCHEMA
             ]
        });
        fixture = TestBed.createComponent(SessionListComponent);
        component = fixture.componentInstance;
        debugEL = fixture.debugElement;
        element = fixture.nativeElement;
    })

    describe('initial display()', () => {

        it('Should have correct name', () => {
            component.sessions = [
                {
                    name:'Session 1',
                    id: 3,
                    presenter: 'Joe',
                    duration: 1,
                    level: 'beginner',
                    abstract: 'abstract',
                    voters: ['john', 'bob']
                }
            ]

            component.filterBy = 'all';
            component.sortBySessionList = 'name';
            component.eventId = 4;
            component.ngOnChanges();

            fixture.detectChanges();

            expect(element.querySelector('[well-title]')!.textContent).toContain('Session 1')
            expect(debugEL.query(By.css('[well-title')).nativeElement.textContent).toContain('Session 1')
        })
        
    })
})