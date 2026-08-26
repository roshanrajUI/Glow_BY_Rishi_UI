import { Component, inject, model, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { Category, Service } from '../models/common.interface';
import { CategoryService } from '../services/category-services/category.service';
import { BookingService } from '../services/booking-services/booking-service';
import { Booking } from '../../shared/models/common.interface';
import { FieldErrorComponent } from '../../shared/components/field-error-component/field-error-component';
import { AlertService } from '../../shared/services/alert-service';

@Component({
  selector: 'app-book-now-dialog',
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    MatCheckboxModule,
    MatCardModule,
    MatDatepickerModule,
    MatInputModule,
    MatTimepickerModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    FieldErrorComponent,
  ],
  templateUrl: './book-now-dialog.html',
  styleUrl: './book-now-dialog.scss',
})
export class BookNowDialog implements OnInit {
  constructor(
    private readonly fb: FormBuilder,
    private categoryService: CategoryService,
    private bookingService: BookingService,
    private alertService: AlertService,
  ) {}
  readonly dialogRef = inject(MatDialogRef<BookNowDialog>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  customerDetailsForm: FormGroup = new FormGroup({});
  selectedDate = model<Date | null>(null);
  selectedTime = model<Date | null>(null);
  categories: Category[] = [];
  selectedServices: Service[] = [];
  today = model<Date | null>(new Date());
  otpForm: FormGroup = new FormGroup({});
  booking!: Booking;
  isBookingNotConfirm = false;
  @ViewChild('stepper') stepper!: MatStepper;

  ngOnInit(): void {
    this.createCustomerDetailsForm();
    this.createOtpForm();
    this.getAllCategories();
  }

  createCustomerDetailsForm() {
    this.customerDetailsForm = this.fb.group({
      clientName: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', [Validators.required, Validators.minLength(3)]],
      gmail: ['', [Validators.required, Validators.email]],
      notes: [''],
    });
  }

  createOtpForm() {
    this.otpForm = this.fb.group({
      otp_0: ['', [Validators.required]],
      otp_1: ['', [Validators.required]],
      otp_2: ['', [Validators.required]],
      otp_3: ['', [Validators.required]],
      otp_4: ['', [Validators.required]],
      otp_5: ['', [Validators.required]],
    });
  }

  getAllCategories() {
    this.categoryService.getAllCategories<Category[]>().subscribe({
      next: (res: Category[]) => {
        this.categories = res;
      },
    });
  }

  dialogClose() {
    this.dialogRef.close();
  }

  addService(event: MatCheckboxChange, selectedService: Service) {
    if (event.checked) {
      this.selectedServices.push(selectedService);
    } else {
      const index = this.selectedServices.indexOf(selectedService);
      if (index !== -1) {
        this.selectedServices.splice(index, 1);
      }
    }
  }

  isSelectedService(serviceId: string): boolean {
    const result = this.selectedServices.find((service) => service.serviceId === serviceId);
    return !!result;
  }

  getServicesName() {
    const servicesNames = this.selectedServices.map((service) => service.serviceName).join();
    return servicesNames;
  }

  get getTotalPrice() {
    return this.selectedServices.reduce((acc, item) => acc + Number(item.price), 0);
  }

  ConfirmBooking() {
    if (this.customerDetailsForm.valid) {
      this.isBookingNotConfirm = true;
      const bookingData = {
        ...this.customerDetailsForm.value,
        bookedServices: this.selectedServices,
        bookingDate: this.selectedDate()?.toISOString(),
        bookingTime: this.selectedTime()?.toISOString(),
        location: 'Nizamabad',
        gmail: this.customerDetailsForm.value.gmail,
        totalPrice: this.getTotalPrice,
      };
      this.bookingService.createBooking<unknown, Booking>(bookingData).subscribe({
        next: (res: Booking) => {
          this.isBookingNotConfirm = false;
          this.booking = res;
          this.stepper.next();
        },
        error: (err: any) => {
          this.isBookingNotConfirm = false;
        },
      });
    }
  }

  onOtpInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;

    // Allow only numbers
    const value = input.value.replace(/\D/g, '');
    input.value = value;

    // Move to next input
    if (value && index < 6) {
      const nextInput = document.getElementById(`otp_${index + 1}`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  onOtpKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;
    if (event.key === 'Backspace') {
      if (index > 0 && !input.value) {
        const prevInput = document.getElementById(`otp_${index - 1}`) as HTMLInputElement;
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  }

  onOtpPaste(event: ClipboardEvent): void {
    event.preventDefault();

    const pastedData = event.clipboardData?.getData('text').replace(/\D/g, '').slice(0, 6);

    if (!pastedData) {
      return;
    }
  }

  resendCode(): void {
    const { bookingNumber } = this.booking;
    const body = {
      bookingNumber,
      gmail: this.customerDetailsForm.value?.gmail,
    };
    this.bookingService.resendOtp<unknown, boolean>(body).subscribe({
      next: (res: boolean) => {
        if (res) {
          this.otpForm.reset();
          this.alertService.showAlert('success', 'Otp Sent Successfully Please Check Your Mail');
        }
      },
    });
  }

  verifyOtp(): void {
    if (this.otpForm.valid) {
      const otp = Object.values(this.otpForm.value).join('');
      const { bookingNumber } = this.booking;
      const body = {
        bookingNumber,
        gmail: this.customerDetailsForm.value?.gmail,
        otp,
      };
      this.bookingService.verifyBookingOtp(body).subscribe({
        next: (res: any) => {
          this.dialogClose();
        },
      });
    }
  }
}
