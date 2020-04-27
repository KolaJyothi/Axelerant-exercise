import { Component, OnInit } from '@angular/core';
import { EventListingService } from './event-listing.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-event-listing',
  templateUrl: './event-listing.component.html',
  styleUrls: ['./event-listing.component.scss']
})
export class EventListingComponent implements OnInit {
  events: Observable<Event[]>;
  eventsForm: FormGroup;
  filterValue: string;

  constructor(private eventListingService: EventListingService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.eventsForm = this.fb.group({
      searchValue: null
    });


    this.events = this.eventListingService.getAllEvents();
  }


  bookSeats(eventName, number_of_seats): void {
    this.router.navigate(['/eventsBooking'], { queryParams: { title: eventName, number_seats: number_of_seats } });
  }
}
