import {Component, OnInit, inject} from '@angular/core'
import {RouterOutlet} from '@angular/router'
import { TopBarComponent } from './shared/components/topBar/topBar.component'
import { CommonModule } from '@angular/common'
import { Store } from '@ngrx/store'
import { authActions } from './auth/store/actions'

@Component({
  selector: 'mc-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    TopBarComponent,
    CommonModule,
  ],
})
export class AppComponent implements OnInit {
  store = inject(Store);
  ngOnInit(): void {
    this.store.dispatch(authActions.getCurrentUser());
  }
}
