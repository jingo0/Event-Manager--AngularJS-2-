import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  EventThumbnailComponent,
  EventService,
  EventDetailsComponent,
  EventListComponent,
  CreateEventComponent,
  EventListResolver,
  CreatSessionComponent,
  SessionListComponent,
  CollapsibleWellComponent,
  DurationPipe,
  upvoteComponent,
  VoterService,
} from './events/index'
import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { appRoutes } from './routes';
import { Error404Component } from './error/404.component';
import { EventRouteActivator } from './events/event-details/event-route-activator.service';
import { AuthService } from './user/auth.service';
import { JQ_TOKEN, TOASTR_TOKEN, Toastr, simpleModalComponent, ModalTriggerDirective } from './common/index';

declare let toastr : Toastr; 
declare let jQuery:any;

@NgModule({
  declarations: [
    EventsAppComponent,
    EventListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreatSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    simpleModalComponent,
    ModalTriggerDirective,
    upvoteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    
  ],
  providers: [
    EventService, 
    {
      provide: TOASTR_TOKEN,
      useValue: toastr
    }, 
    EventRouteActivator,
    {
      provide:'canDeactivateCreateEvent', 
      useValue: checkDirtyStates
    },
    EventListResolver,
    AuthService,
    { 
      provide: JQ_TOKEN,
      useValue: jQuery
    },
    VoterService
  ],
  bootstrap: [EventsAppComponent]})
export class AppModule { }

export function checkDirtyStates(component:CreateEventComponent)
{
  if(component.isDirty)
  {
    return window.confirm('You have not saved this event, do yu really want to cancel?')
  }
  return true
}
