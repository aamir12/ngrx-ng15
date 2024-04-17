import {inject} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Router} from '@angular/router'
import {catchError, map, of, switchMap, tap} from 'rxjs'
import {HttpErrorResponse} from '@angular/common/http'
import {AuthService} from '../services/auth.service'
import {authActions} from './actions'
import {CurrentUserInterface} from '../../shared/types/currentUser.interface'
import {PersistanceService} from '../../shared/services/persistance.service'
import {AuthToken} from '../../shared/constant'

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({request}) =>
        authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            persistanceService.set(AuthToken, currentUser.token)
            return authActions.registerSuccess({currentUser})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.registerFailure({
                errors: errorResponse.error.errors,
              })
            )
          })
        )
      )
    )
  },
  {functional: true}
)

export const redirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => {
        router.navigateByUrl('/')
      })
    )
  },
  {functional: true, dispatch: false}
)

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap(({request}) =>
        authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            persistanceService.set(AuthToken, currentUser.token)
            return authActions.loginSuccess({currentUser})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.loginFailure({
                errors: errorResponse.error.errors,
              })
            )
          })
        )
      )
    )
  },
  {functional: true}
)

export const redirectAfterLoginEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.loginSuccess),
      tap(() => {
        router.navigateByUrl('/')
      })
    )
  },
  {functional: true, dispatch: false}
)

export const getCurrentUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.getCurrentUser),
      switchMap(() => {
        const authToken = persistanceService.get(AuthToken);
        if(!authToken) {
          return of(authActions.getCurrentUserFailure())
        }
        return authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => {
            console.log(currentUser);
            return authActions.getCurrentUserSuccess({currentUser})
          }),
          catchError(() => {
            return of(authActions.getCurrentUserFailure())
          })
        )
      })
    )
  },
  {functional: true}
)
