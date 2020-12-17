import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState, IReduxAction, IUser } from '../interfaces';
import { STORE } from './store.enums'
import { equals, assocPath, cond, T } from 'ramda'

export const INITIAL_APP_STATE: IAppState = {
  user: null,
  countries: [],
  email: ''
}
export const Reducers = (state = INITIAL_APP_STATE, action: IReduxAction) => {
  return cond([
    [equals(STORE.STORE_USER), () => {
      state.user = action.payLoad
      return state
    }],
    [equals(STORE.STORE_COUNTRIES), () => {
      state.countries = action.payLoad
      return state
    }],
    [equals(STORE.STORE_EMAIL), () => {
      state.countries = action.payLoad
      return state
    }],
    [equals('@@redux/INIT'), () => INITIAL_APP_STATE],
    [T, () => state]
  ])(action.type)
}

@Injectable()
export class StoreActions {
  constructor(private ngRedux: NgRedux<any>) {
  }
  public STORE_USER(user: IUser) {
    this.ngRedux.dispatch({ type: STORE.STORE_USER, payLoad: user })
  }
  public STORE_COUNTRIES(countries: any) {
    this.ngRedux.dispatch({ type: STORE.STORE_COUNTRIES, payLoad: countries })
  }
  public STORE_EMAIL(email: string) {
    this.ngRedux.dispatch({ type: STORE.STORE_EMAIL, payLoad: email })
  }
}
