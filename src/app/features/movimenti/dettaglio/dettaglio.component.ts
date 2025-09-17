import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movimento } from '../../../core/entities/movimento.entity';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-dettaglio',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './dettaglio.component.html',
  styleUrl: './dettaglio.component.css',
})
export class DettaglioComponent {
  @Input()
  movimento!: Movimento;

  @Output()
  details = new EventEmitter<string>();

  onDetails() {
    this.details.emit(this.movimento.id);
  }
}
