interface IName {
  title: string;
  first: string;
  last: string;
}

interface ILocation {
  street: IStreet;
  city: string;
  state: string;
  country: string;
}
interface IStreet {
  number: number;
  name: string;
}

interface IId {
  value: string;
}

export interface IUser {
  name: IName;
  location: ILocation;
  phone: string;
  id: IId;
}
