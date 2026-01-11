import { Component } from '@angular/core';
import { DataService } from '../data';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  users: any[] = [];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getUsers().subscribe((data) => {
      this.users = data;
    });

}
}
