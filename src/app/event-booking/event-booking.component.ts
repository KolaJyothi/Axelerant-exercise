import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Customer } from '../customer';
import { FormGroup, FormControl, FormBuilder, Validators, PatternValidator } from '@angular/forms';

@Component({
  selector: 'app-event-booking',
  templateUrl: './event-booking.component.html',
  styleUrls: ['./event-booking.component.scss']
})
export class EventBookingComponent implements OnInit, OnDestroy {
  title: Observable<object>;
  numberOfSeats: string;
  numberOfSeatsControl;
  formData: Customer;
  seats = [1, 2, 3, 4, 5, 6];
  bookingForm: FormGroup;
  isFormSubmitted = false;
  successMessage = false;
  invalidSeats = false;
  subscription: Subscription;
  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.title = params['title'];
      this.numberOfSeats = params['number_seats'];
    });
    this.bookingForm = this.fb.group({
      userName: [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
      number_of_seats: [null, Validators.required],
      attendee2: null,
      attendee3: null,
      attendee4: null,
      attendee5: null,
      attendee6: null,
    });

    this.subscription = this.bookingForm.get('number_of_seats').valueChanges.subscribe(value => {
      if (value > 1) {
        for (let val = 2; val <= value; val++) {
          this.bookingForm.get('attendee' + val).setValidators(Validators.required);
        }
      }
    });

  };
  onChangeSelect(): void {
    this.numberOfSeatsControl = this.bookingForm.get('number_of_seats').value;
    if (Number(this.numberOfSeatsControl) > Number(this.numberOfSeats)) {
      this.invalidSeats = true;
      this.bookingForm.controls['number_of_seats'].setErrors({ 'incorrect': true });

    }
    else {
      this.invalidSeats = false;
      this.bookingForm.controls['number_of_seats'].setErrors(null);
    }
  }
  getAttendeeIndex(value): string {
    return 'attendee' + value;
  }
  bookTickets(): void {
    this.isFormSubmitted = true;
    if (this.bookingForm.valid) {
      this.formData = this.bookingForm.value;
      console.log(this.bookingForm.value);
      this.successMessage = true;
      this.bookingForm.reset();
      this.isFormSubmitted = false;
    }
  }
  cancel(): void {
    this.router.navigateByUrl('/eventsListing');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
