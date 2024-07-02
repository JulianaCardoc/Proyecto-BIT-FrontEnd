import { Component, inject, resolveForwardRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLinkWithHref } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLinkWithHref, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    lastname: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    document: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    documentType: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    cellphone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  async register() {
    if(this.registerForm.valid) {
      const user = this.registerForm.getRawValue();
      await new Promise<void>((resolve) => {
        this.authService.register(user).subscribe({
          next: () => {
            this.router.navigate(['/login'])
          }
        });
        resolve();
      });
    }
  }
}
