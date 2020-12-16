export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  ip_address: string;
}
export interface IData {
  id: number
  userId: number
  title: string
  completed: boolean
  value?: number
}



