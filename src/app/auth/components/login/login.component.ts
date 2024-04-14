import {Component} from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { authActions } from '../../store/actions';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { RouterLink } from '@angular/router';
import { AuthStateInterface } from '../../types/authState.interface';
import { CommonModule } from '@angular/common';
import { selectIsSubmitting, selectValidationErrors } from '../../store/reducers';
import { combineLatest } from 'rxjs';

import { LoginRequestInterface } from '../../types/loginRequest.interface';
import { BackendErrorMessages } from 'src/app/shared/components/backendErrorMessages/backendErrorMessages.component';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports:[
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessages
  ]
})
export class LoginComponent {
  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  // isSubmitting$ = this.store.select(selectIsSubmitting);
  //More better way use combineLatest
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    errorMessages: this.store.select(selectValidationErrors)
  })


  //previous we nee to specify the type of state
  //private store: Store<{auth:AuthStateInterface}>
  constructor(
    private fb: FormBuilder,
    private store: Store) {}

  onSubmit() {
    console.log('form', this.form.getRawValue());
    const request:LoginRequestInterface = {user: this.form.getRawValue()}
    this.store.dispatch(authActions.login({request}))
  }
}
