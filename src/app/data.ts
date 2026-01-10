import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getCountries() {
    return ["Tunisia", "France", "Germany", "Spain", "Italy"];
  }
}