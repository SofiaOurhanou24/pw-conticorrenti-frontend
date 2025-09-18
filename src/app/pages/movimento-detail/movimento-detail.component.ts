import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MovimentiService } from '../../services/movimenti.service';
import { AuthService } from '../../services/auth.service';
import { Movimento } from '../../entities/movimento.entity';

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
