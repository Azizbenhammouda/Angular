# Angular Fundamentals Cheat Sheet 


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

## HTTP, Pipes, Forms, Lifecycle & Route Parameters

---

## 1. HTTP REQUESTS (GET)

### Step 1: Enable HTTP in App Config
**⚠️ IMPORTANT: Do this ONCE in app.config.ts**

**app.config.ts:**
```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';  // ← Import

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient()  // ← Add this
  ]
};
```

---

### Step 2: Use HttpClient in Service
**data.service.ts:**
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor(private http: HttpClient) { }
  
  getUsers(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }
}
```

**Key Concepts:**
- `HttpClient` - Angular's HTTP tool
- `Observable` - Represents async data (arrives later)
- `http.get()` - Makes GET request

---

### Step 3: Use Service in Component
**home.ts:**
```typescript
import { Component } from '@angular/core';
import { DataService } from '../data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html'
})
export class Home {
  users: any[] = [];
  
  constructor(private dataService: DataService) { }
  
  ngOnInit() {
    // Subscribe to get data when it arrives
    this.dataService.getUsers().subscribe((data) => {
      this.users = data;
      console.log('Users fetched:', data);
    });
  }
}
```

**home.html:**
```html
<h2>Users from API:</h2>
<ul>
  @for (user of users; track user.id) {
    <li>{{ user.name }} - {{ user.email }}</li>
  }
</ul>
```

**⚠️ IMPORTANT:**
- Use `.subscribe()` to get async data
- Put HTTP calls in `ngOnInit()`, not constructor
- Subscribe in component, return Observable from service

---

## 2. PIPES (Data Formatting)

### Built-in Pipes
**component.ts:**
```typescript
export class About {
  name = "angular developer";
  today = new Date();
  price = 1250.75;
  user = { name: "Ahmed", age: 25 };
}
```

**HTML:**
```html
<!-- Uppercase/Lowercase -->
<p>{{ name | uppercase }}</p>  <!-- ANGULAR DEVELOPER -->
<p>{{ name | lowercase }}</p>  <!-- angular developer -->

<!-- Date -->
<p>{{ today | date:'short' }}</p>       <!-- 1/11/26, 3:30 PM -->
<p>{{ today | date:'fullDate' }}</p>    <!-- Sunday, January 11, 2026 -->
<p>{{ today | date:'dd/MM/yyyy' }}</p>  <!-- 11/01/2026 -->

<!-- Currency -->
<p>{{ price | currency:'TND' }}</p>  <!-- TND1,250.75 -->
<p>{{ price | currency:'USD' }}</p>  <!-- $1,250.75 -->

<!-- Number -->
<p>{{ price | number:'1.2-2' }}</p>  <!-- 1,250.75 -->
<!-- Format: 'minInt.minDecimal-maxDecimal' -->

<!-- JSON (for debugging) -->
<pre>{{ user | json }}</pre>
<!-- {
  "name": "Ahmed",
  "age": 25
} -->
```

**Common Date Formats:**
- `'short'` - 1/11/26, 3:30 PM
- `'medium'` - Jan 11, 2026, 3:30:00 PM
- `'long'` - January 11, 2026 at 3:30:00 PM
- `'full'` - Sunday, January 11, 2026 at 3:30:00 PM
- `'shortDate'` - 1/11/26
- `'fullDate'` - Sunday, January 11, 2026

**⚠️ NO IMPORT NEEDED** - Pipes work automatically!

---

## 3. LIFECYCLE HOOKS

### Common Lifecycle Methods

**component.ts:**
```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.html'
})
export class About implements OnInit, OnDestroy {
  counter = 0;
  intervalId: any;
  
  // 1. Constructor - Component is being created
  constructor() {
    console.log('1. Constructor called');
  }
  
  // 2. ngOnInit - Component is ready (BEST place for data fetching)
  ngOnInit() {
    console.log('2. ngOnInit called');
    
    // Start interval
    this.intervalId = setInterval(() => {
      this.counter++;
    }, 1000);
  }
  
  // 3. ngOnDestroy - Component is being destroyed (CLEANUP!)
  ngOnDestroy() {
    console.log('3. ngOnDestroy called');
    
    // Clean up to prevent memory leaks
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
```

**Lifecycle Order:**
```
1. constructor()
2. ngOnInit()
   ... component exists ...
3. ngOnDestroy() (when navigating away)
```

**Best Practices:**
- ✅ Fetch data in `ngOnInit()`
- ✅ Clean up in `ngOnDestroy()` (timers, subscriptions)
- ❌ Don't fetch data in `constructor()`

**Other Hooks (less common):**
- `ngOnChanges()` - When `@Input` values change
- `ngAfterViewInit()` - After view is fully loaded
- `ngDoCheck()` - Custom change detection

---

## 4. TEMPLATE-DRIVEN FORMS

### Complete Form Example

**⚠️ IMPORTANT: Must import FormsModule**

**component.ts:**
```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // ← Import
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],  // ← Add both
  templateUrl: './home.html'
})
export class Home {
  // Form model
  contactForm = {
    name: '',
    email: '',
    message: ''
  };
  
  submitted = false;
  
  onSubmit() {
    this.submitted = true;
    console.log('Form:', this.contactForm);
    alert(`Thank you ${this.contactForm.name}!`);
    
    // Reset
    this.contactForm = { name: '', email: '', message: '' };
    this.submitted = false;
  }
}
```

**HTML:**
```html
<form #contactFormRef="ngForm" (ngSubmit)="onSubmit()">
  
  <!-- Name Field -->
  <div>
    <label>Name:</label>
    <input 
      type="text" 
      name="name" 
      [(ngModel)]="contactForm.name" 
      required 
      minlength="3"
      #nameInput="ngModel">
    
    <!-- Validation Errors -->
    @if (nameInput.invalid && nameInput.touched) {
      <div style="color: red;">
        @if (nameInput.errors?.['required']) {
          <span>Name is required</span>
        }
        @if (nameInput.errors?.['minlength']) {
          <span>Name must be at least 3 characters</span>
        }
      </div>
    }
  </div>
  
  <!-- Email Field -->
  <div>
    <label>Email:</label>
    <input 
      type="email" 
      name="email" 
      [(ngModel)]="contactForm.email" 
      required 
      email
      #emailInput="ngModel">
    
    @if (emailInput.invalid && emailInput.touched) {
      <div style="color: red;">
        @if (emailInput.errors?.['required']) {
          <span>Email is required</span>
        }
        @if (emailInput.errors?.['email']) {
          <span>Invalid email format</span>
        }
      </div>
    }
  </div>
  
  <!-- Submit Button -->
  <button 
    type="submit" 
    [disabled]="contactFormRef.invalid">
    Submit
  </button>
  
</form>
```

### Form Validation Rules

**Built-in Validators:**
```html
<input required>                  <!-- Must be filled -->
<input minlength="3">            <!-- Min 3 characters -->
<input maxlength="20">           <!-- Max 20 characters -->
<input email>                    <!-- Valid email format -->
<input pattern="[0-9]{8}">      <!-- Must match pattern (8 digits) -->
<input min="18">                 <!-- Min value for numbers -->
<input max="100">                <!-- Max value for numbers -->
```

### Form Validation States

| **State** | **Meaning** |
|-----------|-------------|
| `valid` | All rules passed ✓ |
| `invalid` | At least one rule failed ✗ |
| `touched` | User clicked/focused field |
| `untouched` | User hasn't interacted |
| `dirty` | User changed value |
| `pristine` | Value unchanged |

**Access States:**
```html
<input #nameInput="ngModel">

@if (nameInput.invalid) { }     <!-- Has errors -->
@if (nameInput.touched) { }     <!-- User interacted -->
@if (nameInput.dirty) { }       <!-- User changed it -->
```

---

## 5. ROUTE PARAMETERS

### Dynamic Routes with Parameters

**Step 1: Define Route (app.routes.ts)**
```typescript
import { Routes } from '@angular/router';
import { Home } from './home/home';
import { UserDetail } from './user-detail/user-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'user/:id', component: UserDetail }  // :id is parameter
];
```

**Examples:**
- `/user/1` → `id = 1`
- `/user/25` → `id = 25`
- `/user/abc` → `id = "abc"`

---

**Step 2: Access Parameter in Component**

**user-detail.ts:**
```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail.html'
})
export class UserDetail implements OnInit {
  userId: string = '';
  
  users = [
    { id: 1, name: 'Ahmed', email: 'ahmed@example.com' },
    { id: 2, name: 'Fatima', email: 'fatima@example.com' }
  ];
  
  user: any = null;
  
  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {
    // Get :id parameter from URL
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    
    // Find user with matching ID
    this.user = this.users.find(u => u.id === parseInt(this.userId));
  }
}
```

**user-detail.html:**
```html
<h1>User Details</h1>

@if (user) {
  <div>
    <h2>{{ user.name }}</h2>
    <p>Email: {{ user.email }}</p>
  </div>
} @else {
  <p>User not found!</p>
}
```

---

**Step 3: Navigate to Dynamic Route**

**home.html:**
```html
<ul>
  @for (user of users; track user.id) {
    <li>
      {{ user.name }}
      <a [routerLink]="['/user', user.id]">View Details</a>
    </li>
  }
</ul>
```

**Breakdown:**
```html
[routerLink]="['/user', user.id]"
```
- If `user.id = 3` → Creates route `/user/3`
- Array format: `[path, param1, param2, ...]`

**⚠️ IMPORTANT: Import RouterLink**
```typescript
import { RouterLink } from '@angular/router';

@Component({
  // ...
  imports: [RouterLink],
})
```

---

## COMPLETE IMPORT REFERENCE

### app.config.ts (Configure once)
```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient()  // For HTTP requests
  ]
};
```

### Component Imports
```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';           // For [(ngModel)]
import { CommonModule } from '@angular/common';         // For *ngIf, *ngFor
import { RouterLink } from '@angular/router';           // For [routerLink]
import { ActivatedRoute } from '@angular/router';       // For route params
import { HttpClient } from '@angular/common/http';      // For HTTP (in service)
import { Observable } from 'rxjs';                      // For async data

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    FormsModule,    // When using [(ngModel)]
    CommonModule,   // When using *ngIf, *ngFor
    RouterLink      // When using [routerLink]
  ],
  templateUrl: './example.html'
})
export class Example implements OnInit, OnDestroy {
  
  constructor(
    private dataService: DataService,     // Inject service
    private route: ActivatedRoute         // For route params
  ) { }
  
  ngOnInit() {
    // Fetch data here
  }
  
  ngOnDestroy() {
    // Cleanup here
  }
}
```

---

## COMMON PATTERNS

### HTTP Request Pattern
```typescript
// 1. Service returns Observable
getUsers(): Observable<any> {
  return this.http.get('url');
}

// 2. Component subscribes in ngOnInit
ngOnInit() {
  this.service.getUsers().subscribe(data => {
    this.users = data;
  });
}
```

### Form Submit Pattern
```typescript
// 1. Form model in component
contactForm = { name: '', email: '' };

// 2. Submit handler
onSubmit() {
  console.log(this.contactForm);
  // Reset after submit
  this.contactForm = { name: '', email: '' };
}
```

### Route Navigation Pattern
```html
<!-- Static route -->
<a routerLink="/about">About</a>

<!-- Dynamic route with parameter -->
<a [routerLink]="['/user', userId]">View User</a>
```

---

## TROUBLESHOOTING

### "Can't bind to 'ngModel'"
**Solution:** Import `FormsModule`

### "Can't bind to 'ngForOf'"
**Solution:** Import `CommonModule` or use `@for` syntax

### "Can't bind to 'routerLink'"
**Solution:** Import `RouterLink`

### "NullInjectorError: No provider for HttpClient"
**Solution:** Add `provideHttpClient()` to `app.config.ts`

### Form not validating
**Check:**
- Each input has `name="..."` attribute
- Form has `#formName="ngForm"`
- Input has `#inputName="ngModel"`