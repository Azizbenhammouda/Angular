import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css'
})
export class UserCard {
  @Input() userName: string = '';  // Receives data from parent
  @Input() userAge: number = 0;    // Receives data from parent
  @Output() userClicked = new EventEmitter<string>(); //creates an event that sends a string
  onCardClick() {
    this.userClicked.emit(this.userName);  // sends username to parent
  }
}