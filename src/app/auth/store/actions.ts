import {createAction, createActionGroup, emptyProps, props} from '@ngrx/store'
import {RegisterRequestInterface} from '../types/registerRequest.interface'
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { LoginRequestInterface } from '../types/loginRequest.interface';


// 'Register failure': emptyProps(), //incase of empty response
export const authActions = createActionGroup({
    source:'auth',
    events: {
        Register: props<{request: RegisterRequestInterface}>(),
        'Register success': props<{currentUser: CurrentUserInterface}>(),
        'Register failure': props<{errors: BackendErrorsInterface}>(),

        Login: props<{request: LoginRequestInterface}>(),
        'Login success': props<{currentUser: CurrentUserInterface}>(),
        'Login failure': props<{errors: BackendErrorsInterface}>(),

        'Get current user': emptyProps(),
        'Get current user success': props<{currentUser: CurrentUserInterface}>(),
        'Get current user failure': emptyProps(),
    }
});


//Instead of create separte function for each we can use createActionGroup
// export const register = createAction(
//     '[Auth] Register',
//     props<{request: RegisterRequestInterface}>()
// )

// export const registerSuccess = createAction(
//     '[Auth] Register success',
//     props<{request: RegisterRequestInterface}>()
// )

// export const registerFailure = createAction(
//     '[Auth] Register failure',
//     props<{request: RegisterRequestInterface}>()
// )