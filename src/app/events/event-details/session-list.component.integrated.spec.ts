import { SessionListComponent, UpvoteComponent } from ".";
import { DurationPipe, ISession } from "..";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "src/app/user/auth.service";
import { VoterService } from "./voter.service";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { CollapsibleWellComponent } from "src/app/common";
import { By } from "@angular/platform-browser";

describe('SessionListComponent', () => {
    let mockAuthService: AuthService, 
        mockVoterService: VoterService,
        fixture: ComponentFixture<SessionListComponent>,
        component: SessionListComponent,
        element: HTMLElement,
        debugEl: DebugElement;

    beforeEach(() => {
      mockAuthService = <AuthService>{ isAuthenticated: () => true, currentUser: { userName: 'Joe' } };
      mockVoterService = <VoterService><unknown>{ userHasVoted: () => true };
      TestBed.configureTestingModule({
        declarations: [
          SessionListComponent,
          DurationPipe
        ],
        providers: [
          { provide: AuthService, useValue: mockAuthService },
          { provide: VoterService, useValue: mockVoterService }
        ],
        schemas: [
          // Adding this makes this a shallow integration test, where the child component missing errors are suppressed
          // Deep integration test is where child components are mocked and imported and is tested as well
          NO_ERRORS_SCHEMA
        ]
      });
      fixture = TestBed.createComponent(SessionListComponent);
      component = fixture.componentInstance;
      debugEl =  fixture.debugElement;
      element =  fixture.nativeElement;
    })

    describe('initial display', () => {
        it('should have the correct name', () => {
          component.sessions = [{name: 'session 1', id: 3, presenter: 'Joe', duration: 1, level: 'beginner', abstract: 'abstract',
                                voters: ['john', 'bob']}];
          component.filterBy = 'all';
          component.sortBy = 'name';
          component.eventId = 4;
          component.ngOnChanges();

          fixture.detectChanges();

          // expect(element.querySelector('[well-title]')?.textContent).toContain('session 1');
          expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent).toContain('session 1');
        });
    });
});