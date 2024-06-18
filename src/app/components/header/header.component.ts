import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  sidebarShowctrl = new FormControl(false, {
    nonNullable: true
  })
  toggleSidebar() {
    this.sidebarShowctrl.setValue(!this.sidebarShowctrl.value)    
  }
}
