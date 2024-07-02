import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  private userService = inject(UserService);

  user = this.userService.extractUser();

  switchUserInfo = signal<0|1|2|3>(0)

  toggleUserInfo(menuId: 0|1|2|3) {
    this.switchUserInfo.set(menuId)
  }
}
