import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../data';
import { UserCard } from '../user-card/user-card';

@Component({
  selector: 'app-greeting',
  standalone: true,  
  imports: [FormsModule,CommonModule,UserCard],
  templateUrl: './greeting.html',
  styleUrl: './greeting.css',
})
export class Greeting {
  message = "Welcome to Angular!";
  imageUrl = "https://angular.io/assets/images/logos/angular/angular.png";
  isButtonDisabled = false;
  userName = "";
  showSecret = false;
  hobbies = ["Reading", "Coding", "Gaming", "Traveling"];
  countries: string[] = []; 
  constructor(private dataService: DataService) { }  // Inject the service

  ngOnInit() {
    this.countries = this.dataService.getCountries();  // Get data from service
  }
  onButtonClick() {
    alert("Button was clicked!");
    this.message="you clicked the button"
  }
}
