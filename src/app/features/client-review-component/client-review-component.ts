import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BookingService } from '../services/booking-services/booking-service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTimepickerModule } from '@angular/material/timepicker';

@Component({
  selector: 'app-client-review-component',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './client-review-component.html',
  styleUrl: './client-review-component.scss',
})
export class ClientReviewComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
  ) {}
  readonly dialogRef = inject(MatDialogRef<ClientReviewComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  bookingReviewForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.createBookingReviewForm();
  }

  createBookingReviewForm() {
    this.bookingReviewForm = this.fb.group({
      clientNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      bookingNumber: ['', Validators.required],
      rating: ['', Validators.required],
      review: ['', Validators.required],
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submitReview() {
    this.bookingService
      .createBookingReview<unknown, unknown>(this.bookingReviewForm.value)
      .subscribe({
        next: (res) => {
          console.log('Review submitted successfully', res);
          this.dialogRef.close();
        },
        error: (err) => {
          console.error('Error submitting review', err);
        },
      });
  }
}
