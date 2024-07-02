import { Component, inject } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLinkWithHref, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);
  status: string = 'init';

  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  async login() {
    if (this.loginForm.valid) {
      this.status = 'processing';
      const { email, password } = this.loginForm.getRawValue();
      await new Promise<void>((resolve) => {
        this.authService.login(email, password).subscribe({
          next: () => {
            this.status = 'succeeded';

            resolve();
          },
          error: (err) => {
            this.status = 'failed';
            console.error('Error :', err);
            resolve();
          },
        });
      });

      await new Promise<void>((resolve) => {
        this.userService.getUser(email).subscribe({
          next: (data) => {
            this.userService.storageUser(data);
            this.router.navigate(['']).then(() => {
              window.location.reload();
            });
            resolve();
          },
          error: (err) => {
            console.error('Error :', err);
            resolve();
          },
        });
      });
    }
  }
}
