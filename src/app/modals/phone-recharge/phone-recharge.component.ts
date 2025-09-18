import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-phone-recharge',
  imports: [],
  templateUrl: './phone-recharge.component.html',
  styleUrl: './phone-recharge.component.css'
})
export class PhoneRechargeComponent {
  @Output() close = new EventEmitter<PhoneRecharge | null>();

  number?: number;
  amount: number | null = null;

  errorString: string[] = [];
  viewAlerts: boolean = false;

  timeoutID: any;

  submit() {
    if (!this.number || !this.amount || this.amount <= 0) {
      this.viewAlerts = false;
      this.errorString = [];
      clearTimeout(this.timeoutID);

      if (!this.number) this.errorString.push('Inserire un numero di telefono valido');
      if (!this.amount || this.amount <= 0) this.errorString.push('Inserire una cifra valida da ricaricare');

      this.errorString = [...this.errorString];
      this.viewAlerts = true;

      this.timeoutID = setTimeout(() => {
        this.viewAlerts = false;
      }, 5000);

      return;
    }

    const result: PhoneRecharge = {
      number: this.number,
      amount: this.amount,
    };

    this.close.emit(result);
  }
}

export interface PhoneRecharge {
  number: number;
  amount: number;
}
