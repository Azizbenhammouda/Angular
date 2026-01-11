# Angular Fundamentals Cheat Sheet (Part 1)
## Before HTTP Requests

---

## 1. PROJECT SETUP

### Create New Project
```bash
ng new project-name
cd project-name
ng serve
```

### Generate Component
```bash
ng generate component component-name
# Shortcut:
ng g c component-name
```

### Generate Service
```bash
ng generate service service-name
# Shortcut:
ng g s service-name
```

---

## 2. COMPONENT STRUCTURE

### Component Files (4 files created)
- `component.ts` - TypeScript logic
- `component.html` - HTML template
- `component.css` - Styles
- `component.spec.ts` - Tests (ignore for now)

### Basic Component Structure
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-greeting',
  standalone: true,
  imports: [],  // Add modules here
  templateUrl: './greeting.html',
  styleUrl: './greeting.css'
})
export class Greeting {
  // Properties
  message = "Hello Angular";
  
  // Methods
  onButtonClick() {
    alert("Clicked!");
  }
}
```

---

## 3. DATA BINDING

### a) Interpolation {{ }}
**Purpose:** Display data from TypeScript in HTML

**TypeScript:**
```typescript
message = "Welcome to Angular!";
userName = "Ahmed";
```

**HTML:**
```html
<h1>{{ message }}</h1>
<p>Hello, {{ userName }}!</p>
```

---

### b) Property Binding [ ]
**Purpose:** Bind TypeScript variables to HTML element properties

**TypeScript:**
```typescript
imageUrl = "https://example.com/image.png";
isButtonDisabled = true;
placeholderText = "Enter name";
```

**HTML:**
```html
<img [src]="imageUrl" alt="Image">
<button [disabled]="isButtonDisabled">Click Me</button>
<input [placeholder]="placeholderText">
```

**Rule:** Use `[ ]` for attributes/properties of HTML elements

---

### c) Event Binding ( )
**Purpose:** Handle user events (clicks, typing, etc.)

**TypeScript:**
```typescript
onButtonClick() {
  alert("Button was clicked!");
  this.message = "Button clicked!";
}
```

**HTML:**
```html
<button (click)="onButtonClick()">Click Me</button>
```

**Common Events:**
- `(click)` - Mouse click
- `(keyup)` - Key press
- `(change)` - Input change
- `(submit)` - Form submit

---

### d) Two-Way Binding [(ngModel)]
**Purpose:** Sync data between TypeScript and HTML (both directions)

**⚠️ IMPORTANT: Must import FormsModule**

**Component TypeScript:**
```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // ← Import this

@Component({
  selector: 'app-greeting',
  standalone: true,
  imports: [FormsModule],  // ← Add here
  templateUrl: './greeting.html',
  styleUrl: './greeting.css'
})
export class Greeting {
  userName = "";
}
```

**HTML:**
```html
<input [(ngModel)]="userName" placeholder="Enter name">
<p>Hello, {{ userName }}!</p>
```

**Syntax:** `[(ngModel)]` = "banana in a box" 🍌📦

---

## 4. DIRECTIVES

### a) *ngIf (Conditional Rendering)
**Purpose:** Show/hide elements based on condition

**⚠️ IMPORTANT: Must import CommonModule**

**Component TypeScript:**
```typescript
import { CommonModule } from '@angular/common';  // ← Import this

@Component({
  // ...
  imports: [CommonModule],  // ← Add here
})
export class Greeting {
  showSecret = false;
}
```

**HTML:**
```html
<button (click)="showSecret = !showSecret">Toggle</button>
<p *ngIf="showSecret">This is secret!</p>
```

**Modern Syntax (No import needed):**
```html
@if (showSecret) {
  <p>This is secret!</p>
}
```

---

### b) *ngFor (Loops)
**Purpose:** Repeat HTML elements for each item in array

**⚠️ IMPORTANT: Must import CommonModule**

**Component TypeScript:**
```typescript
import { CommonModule } from '@angular/common';  // ← Import this

@Component({
  // ...
  imports: [CommonModule],  // ← Add here
})
export class Greeting {
  hobbies = ["Reading", "Coding", "Gaming"];
}
```

**HTML:**
```html
<ul>
  <li *ngFor="let hobby of hobbies">{{ hobby }}</li>
</ul>
```

**Modern Syntax (No import needed):**
```html
<ul>
  @for (hobby of hobbies; track hobby) {
    <li>{{ hobby }}</li>
  }
</ul>
```

---

## 5. SERVICES & DEPENDENCY INJECTION

### Create Service
```bash
ng generate service data
```

### Service Structure
**data.ts:**
```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // Makes it available app-wide
})
export class DataService {
  
  constructor() { }
  
  getCountries() {
    return ["Tunisia", "France", "Germany"];
  }
}
```

### Use Service in Component
**component.ts:**
```typescript
import { DataService } from '../data';  // Import service

@Component({
  // ...
  // ⚠️ Don't add service to imports array!
})
export class Greeting {
  countries: string[] = [];
  
  // Inject service via constructor
  constructor(private dataService: DataService) { }
  
  ngOnInit() {
    this.countries = this.dataService.getCountries();
  }
}
```

**HTML:**
```html
<ul>
  @for (country of countries; track country) {
    <li>{{ country }}</li>
  }
</ul>
```

**⚠️ IMPORTANT:**
- Services are injected via **constructor**
- Do NOT add services to `imports` array
- Fetch data in `ngOnInit()`, not constructor

---

## 6. COMPONENT COMMUNICATION

### a) Parent → Child (@Input)
**Purpose:** Send data from parent to child

**Child Component (user-card.ts):**
```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.html'
})
export class UserCard {
  @Input() userName: string = '';  // Receives from parent
  @Input() userAge: number = 0;
}
```

**Child HTML (user-card.html):**
```html
<p>Name: {{ userName }}</p>
<p>Age: {{ userAge }}</p>
```

**Parent Component:**
```typescript
import { UserCard } from '../user-card/user-card';

@Component({
  // ...
  imports: [UserCard],  // Import child component
})
export class Parent { }
```

**Parent HTML:**
```html
<app-user-card [userName]="'Ahmed'" [userAge]="25"></app-user-card>
```

---

### b) Child → Parent (@Output)
**Purpose:** Send data from child to parent

**Child Component (user-card.ts):**
```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.html'
})
export class UserCard {
  @Input() userName: string = '';
  @Output() userClicked = new EventEmitter<string>();
  
  onCardClick() {
    this.userClicked.emit(this.userName);  // Send to parent
  }
}
```

**Child HTML:**
```html
<button (click)="onCardClick()">Select User</button>
```

**Parent Component:**
```typescript
export class Parent {
  onUserSelected(name: string) {
    alert(`Selected: ${name}`);
  }
}
```

**Parent HTML:**
```html
<app-user-card 
  [userName]="'Ahmed'" 
  (userClicked)="onUserSelected($event)">
</app-user-card>
```

**Flow:**
```
Child emits → userClicked.emit(data)
Parent listens → (userClicked)="handler($event)"
```

---

## 7. ROUTING

### Step 1: Create Components
```bash
ng g c home
ng g c about
```

### Step 2: Configure Routes (app.routes.ts)
```typescript
import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';

export const routes: Routes = [
  { path: '', component: Home },        // localhost:4200/
  { path: 'home', component: Home },    // localhost:4200/home
  { path: 'about', component: About }   // localhost:4200/about
];
```

### Step 3: Add Navigation (app.component.html)
```html
<nav>
  <a routerLink="/">Home</a>
  <a routerLink="/about">About</a>
</nav>

<router-outlet></router-outlet>
```

### Step 4: Import RouterOutlet & RouterLink (app.component.ts)
```typescript
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],  // Add both
  templateUrl: './app.component.html'
})
export class AppComponent { }
```

**⚠️ IMPORTANT:**
- `<router-outlet>` = Placeholder where components appear
- `routerLink` = Navigate without page reload
- Don't use `<a href>` (it reloads the page)

---

## QUICK REFERENCE

### When to Use What?

| **Task** | **Syntax** | **Import Needed?** |
|----------|-----------|-------------------|
| Display text | `{{ value }}` | No |
| Bind property | `[property]="value"` | No |
| Handle event | `(event)="handler()"` | No |
| Two-way binding | `[(ngModel)]="value"` | Yes - FormsModule |
| Conditional | `*ngIf="condition"` or `@if` | CommonModule or none |
| Loop | `*ngFor="let item of array"` or `@for` | CommonModule or none |
| Navigate | `routerLink="/path"` | RouterLink |

---

## MODULE IMPORT SUMMARY

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';        // For [(ngModel)]
import { CommonModule } from '@angular/common';      // For *ngIf, *ngFor
import { RouterLink } from '@angular/router';        // For routerLink

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],  // Add as needed
  templateUrl: './example.html'
})
export class Example { }
```

**Remember:** Services are NOT added to imports - they're injected via constructor!
