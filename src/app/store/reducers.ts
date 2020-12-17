import { IAppState } from '../interfaces'
import { omit } from 'lodash'

export const deimmutify = (state: IAppState): IAppState => state
export const reimmutify = (plain: any): IAppState => plain || {};
export const StoreSlicer = () => (state: IAppState) => {
  return omit(state, [
    //'user',
  ])
}
