export interface IUser {
  id: number;
  name: string
  email: string;
  address: IAdress
  company: ICompany
  phone
  username
  website
}
export interface IData {
  id: number
  userId: number
  title: string
  completed: boolean
  value?: number
}
export interface IAdress {
  city
  geo
  street
  suite
  zipcode
}
export interface ICompany {
  bs
  catchPhase
  name
}
export interface IAppState {
  user: IUser
  countries
  email: string
}
export interface IReduxAction {
  payLoad: any
  type: string
}
