import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovimentiService } from '../../core/services/movimenti.service';
import { AuthService } from '../../core/services/auth.service';
import { map, Observable } from 'rxjs';
import { Movimento } from '../../core/entities/movimento.entity';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movimento-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movimento-detail.component.html',
  styleUrl: './movimento-detail.component.css',
})
export class MovimentoDetailComponent {
  protected activatedRoute = inject(ActivatedRoute);
  protected movimentiSrv = inject(MovimentiService);
  protected authSrv = inject(AuthService);

  movimento$: Observable<Movimento> = this.activatedRoute.data.pipe(
    map((data) => data['movimento'])
  );
}
