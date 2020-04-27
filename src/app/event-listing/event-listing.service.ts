import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EventListingService{
    eventsUrl = 'assets/events.json';
    constructor(private http: HttpClient){

    }
    getAllEvents(): Observable<Event[]>{
        return this.http.get<Event[]>(this.eventsUrl);
    }
}
