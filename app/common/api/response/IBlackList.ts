export interface IPhone {
  id: number;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface IBlackList {
  id: number;
  is_active: boolean;
  phone: IPhone;
  created_at: string;
  updated_at: string;
}
