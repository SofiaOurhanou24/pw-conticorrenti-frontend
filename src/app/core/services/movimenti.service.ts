import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Movimento } from '../entities/movimento.entity';
import { isNil, omitBy, toInteger } from 'lodash';

import { of } from 'rxjs';

export type MovimentiFilter = {
  max?: number | null;
  startDate?: Date | null;
  endDate?: Date | null;
  category?: string | null;
};

@Injectable({
  providedIn: 'root',
})
export class MovimentiService {
  // Dati fittizi
  private mockMovimentiContoCorrente: Movimento[] = [
    {
      id: '1',
      contoCorrenteID: '1001',
      data: new Date('2025-09-01T10:30:00'),
      importo: 1500.0,
      saldo: 5000.0,
      categoriaMovimentoID: '1',
      descrizioneEstesa: 'Versamento stipendio mensile',
    },
    {
      id: '2',
      contoCorrenteID: '1001',
      data: new Date('2025-09-02T15:45:00'),
      importo: -200.0,
      saldo: 4800.0,
      categoriaMovimentoID: '2',
      descrizioneEstesa: 'Pagamento bolletta luce',
    },
    {
      id: '3',
      contoCorrenteID: '1001',
      data: new Date('2025-09-03T12:00:00'),
      importo: -150.0,
      saldo: 4650.0,
      categoriaMovimentoID: '3',
      descrizioneEstesa: 'Spesa supermercato',
    },
    {
      id: '4',
      contoCorrenteID: '1001',
      data: new Date('2025-09-04T09:30:00'),
      importo: 500.0,
      saldo: 5150.0,
      categoriaMovimentoID: '1',
      descrizioneEstesa: 'Rimborso rimessa fattura',
    },
    {
      id: '5',
      contoCorrenteID: '1001',
      data: new Date('2025-09-05T18:00:00'),
      importo: -75.0,
      saldo: 5075.0,
      categoriaMovimentoID: '4',
      descrizioneEstesa: 'Pagamento abbonamento streaming',
    },
    {
      id: '6',
      contoCorrenteID: '1002',
      data: new Date('2025-09-06T10:00:00'),
      importo: -120.0,
      saldo: 3500.0,
      categoriaMovimentoID: '3',
      descrizioneEstesa: 'Acquisto carburante',
    },
    {
      id: '7',
      contoCorrenteID: '1002',
      data: new Date('2025-09-07T14:15:00'),
      importo: 3000.0,
      saldo: 6500.0,
      categoriaMovimentoID: '1',
      descrizioneEstesa: 'Incasso fattura cliente',
    },
    {
      id: '8',
      contoCorrenteID: '1002',
      data: new Date('2025-09-08T16:00:00'),
      importo: -500.0,
      saldo: 6000.0,
      categoriaMovimentoID: '2',
      descrizioneEstesa: 'Pagamento rata prestito',
    },
    {
      id: '9',
      contoCorrenteID: '1002',
      data: new Date('2025-09-09T11:30:00'),
      importo: -60.0,
      saldo: 5940.0,
      categoriaMovimentoID: '4',
      descrizioneEstesa: 'Spesa farmacia',
    },
    {
      id: '10',
      contoCorrenteID: '1002',
      data: new Date('2025-09-10T09:00:00'),
      importo: 100.0,
      saldo: 6040.0,
      categoriaMovimentoID: '1',
      descrizioneEstesa: 'Bonifico famiglia',
    },
  ];

  protected http = inject(HttpClient);

  // list(filters: MovimentiFilter = {}) {
  //   const q: any = omitBy(filters, isNil);
  //   return this.http.get<Movimento[]>('/api/movimenti', { params: q });
  // }

  // getById(id: string) {
  //   return this.http.get<Movimento>(`/api/products/${id}`);
  // }

  list(filters: MovimentiFilter = {}) {
    let filtered = this.mockMovimentiContoCorrente;

    if (filters.startDate) {
      filtered = filtered.filter((m) => m.data >= filters.startDate!);
    }
    if (filters.endDate) {
      filtered = filtered.filter((m) => m.data <= filters.endDate!);
    }
    if (filters.category) {
      filtered = filtered.filter(
        (m) => m.categoriaMovimentoID === filters.category
      );
    }

    // Ordina per data decrescente per mostrare gli ultimi movimenti
    filtered = filtered.sort((a, b) => b.data.getTime() - a.data.getTime());

    if (filters.max != null) {
      filtered = filtered.slice(0, filters.max);
    }

    return of(filtered);
  }

  getById(id: string) {
    const movimento = this.mockMovimentiContoCorrente.find((m) => m.id === id);
    return of(movimento!);
  }
}
