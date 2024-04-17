import {createFeature, createReducer, on} from '@ngrx/store'
import {FeedStateInterface} from '../types/feedState.interface'
import {feedActions} from './actions'
import {routerNavigatedAction} from '@ngrx/router-store'

const initialState: FeedStateInterface = {
  isLoading: false,
  data: null,
  error: null,
}

const feedFeature = createFeature({
  name: 'feed',
  reducer: createReducer(
    initialState,
    on(feedActions.getFeed, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(feedActions.getFeedSuccess, (state, actions) => ({
      ...state,
      isLoading: false,
      data: actions.feed,
    })),
    on(feedActions.getFeedFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(routerNavigatedAction, () => initialState)
  ),
})

export const {
  name: feedFeatureKey,
  reducer: feedReducer,
  selectData: selectFeedData,
  selectIsLoading,
  selectError,
} = feedFeature
