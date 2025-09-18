import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movimento } from '../../entities/movimento.entity';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  @Input()
  movimento!: Movimento;

  @Output()
  details = new EventEmitter<string>();

  onDetails() {
    this.details.emit(this.movimento.id);
  }
}
