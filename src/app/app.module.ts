import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { TOASTR_TOKEN, CollapsibleWellComponent, Toastr, JQ_TOKEN, SimpleModalComponent, ModalTriggerDirective } from './common/index';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { appRoutes } from 'src/routes';
import { Error404Component } from './errors/404.component';
import {
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent,
  // EventRouteActivator,
  EventListResolver,
  EventResolver,
  CreateSessionComponent,
  SessionListComponent,
  DurationPipe,
  UpvoteComponent,
  VoterService,
  LocationValidator
} from './events/index';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const toastr:Toastr = window['toastr'];
const jQuery = window['$'];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective,
    LocationValidator,
    UpvoteComponent
  ],
  providers: [
    EventService,
    { 
      provide: TOASTR_TOKEN, 
      useValue: toastr 
    },
    { 
      provide: JQ_TOKEN, 
      useValue: jQuery 
    },
    // EventRouteActivator,
    EventResolver,
    EventListResolver,
    AuthService,
    VoterService,
    { 
      provide: 'canDeactivateCreateEvent', 
      useValue: checkDirtyState 
    }
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component:CreateEventComponent) {
  if(component.isDirty)
    return window.confirm('You have not saved this event, do you really want to cancel?');
  return true;
}