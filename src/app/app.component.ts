import {Component} from '@angular/core'
import {RouterOutlet} from '@angular/router'
import { TopBarComponent } from './shared/components/topBar/topBar.component'
import { CommonModule } from '@angular/common'

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
export class AppComponent {}
