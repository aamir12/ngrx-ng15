import {createFeature, createReducer, on} from '@ngrx/store'
import {AuthStateInterface} from '../types/authState.interface'
import {authActions} from './actions'
import {  routerNavigationAction } from '@ngrx/router-store'

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser:undefined,
  validationErrors:null
}

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true, 
      validationErrors:null
    })),
    on(authActions.registerSuccess,(state,actions) => ({ 
      ...state,
      isSubmitting: false,
      currentUser: actions.currentUser,
    })),
    on(authActions.registerFailure,(state,actions) => ({
       ...state,
      isSubmitting: false,
      validationErrors:actions.errors 
    })),
    on(authActions.login, (state) => ({
      ...state,
      isSubmitting: true, 
      validationErrors:null
    })),
    on(authActions.loginSuccess,(state,actions) => ({ 
      ...state,
      isSubmitting: false,
      currentUser: actions.currentUser,
    })),
    on(authActions.loginFailure,(state,actions) => ({
       ...state,
      isSubmitting: false,
      validationErrors:actions.errors 
    })),
    on(routerNavigationAction,(state) => ({
      ...state,
     validationErrors:null
   })),
  ),
})

//no need to create selectors, Here selectIsSubmitting is provided by createFeature
//select + camelCase of state name : it is convention provided by createFeature
export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectCurrentUser,
  selectIsLoading,
  selectValidationErrors
} = authFeature
