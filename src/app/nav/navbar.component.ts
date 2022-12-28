import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService, IEvent, ISession } from '../events';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: `./navbar.component.html`,
  styles: [`
    .nav.navbar-nav {font-size: 15px;}
    #searchForm {margin-right: 100px;}
    @media (max-width: 1200px) {#searchForm {display: none}}
    li > a.active { color: #F97924; }
  `]
})
export class NavBarComponent {
  searchTerm = "";
  foundSessions!: any;
  events: IEvent[] | undefined;

  constructor(public authService: AuthService, private eventService: EventService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(events => {
      if(events)
        this.events = events;
    });
}

  searchSessions(searchTerm: string) {
    this.eventService.searchSessions(searchTerm).subscribe((sessions: any) => {
      this.foundSessions = sessions;
    });
  }
}
