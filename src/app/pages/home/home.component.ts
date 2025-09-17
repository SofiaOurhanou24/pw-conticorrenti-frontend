import { Component, inject } from '@angular/core';
import { MovimentiService } from '../../core/services/movimenti.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Movimento } from '../../core/entities/movimento.entity';
import { DettaglioComponent } from '../../features/movimenti/dettaglio/dettaglio.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DettaglioComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  protected movimentiSrv = inject(MovimentiService);
  protected router = inject(Router);

  movimenti$ = this.movimentiSrv.list({ max: 5 });

  goToDetails(movimentoId: string) {
    this.router.navigate([`/home/${movimentoId}`]);
  }

  trackById(_: any, movimento: Movimento) {
    return movimento.id;
  }
}

// Benvenuto Mario Rossi, il saldo del conto corrente e una tabella con gli ultimi 5 movimenti.
// Nella tabella con gli ultimi 5 movimenti deve essere presente un pulsante o link  “Dettagli” che permette di accedere alla pagina web   DettaglioMovimento dove verrà  visualizzato il dettaglio del movimento selezionato (tutti i campi della TMovimentiContoCorrente)
