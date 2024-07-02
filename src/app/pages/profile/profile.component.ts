import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SellsService } from '../../services/sells.service';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CurrencyPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  private userService = inject(UserService);
  private sellService = inject(SellsService);

  user = this.userService.user;
  sells = this.sellService.userSells;

  switchUserInfo = signal<0 | 1 | 2 | 3>(0);
  editMode = signal(false);

  personalInfoForm = new FormGroup({
    email: new FormControl(this.user()?.email ?? '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    name: new FormControl(this.user()?.person.name ?? '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    lastname: new FormControl(this.user()?.person.lastname ?? '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    document: new FormControl(this.user()?.person.document ?? '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    documentType: new FormControl(this.user()?.person.documentType ?? '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    cellphone: new FormControl(this.user()?.person.cellphone ?? '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  toggleUserInfo(menuId: 0 | 1 | 2 | 3) {
    this.switchUserInfo.set(menuId);
  }

  toggleEditMode(event: Event) {
    event.preventDefault();
    this.editMode.update((prevState) => !prevState);
  }

  async updatePersonalInfo() {
    const personId = this.user()?.person._id;
    const email = this.user()?.email;
    if (this.personalInfoForm.valid && personId && email) {
      const person = this.personalInfoForm.getRawValue();
      await new Promise<void>((resolve) => {
        this.userService.updatePerson(personId, person).subscribe({
          next: () => {
            resolve();
          },
        });
      });
      await new Promise<void>((resolve) => {
        this.userService.getUser(email).subscribe({
          next: () => {
            resolve();
          },
        });
      });
    }
  }

  ngOnInit() {
    this.getUserSells();
  }

  async getUserSells() {
    const userId = this.user()?._id;
    if (userId) {
      await new Promise<void>((resolve) => {
        this.sellService.getAllSellsbyUser(userId).subscribe({
          next: () => {
            resolve();
          },
        });
      });
    }
  }
}
