export type UserData = {
  _id: string;
  name: string;
  job: string;
  email: string;
  position: string;
  phoneNumber: string;
  hireDate: string;
  birthDate: string;
  admin: boolean;
};
export type ResponeData = {
  data: {
    status: boolean,
    data: {
      code: number,
      msg: string,
    },
    admin: boolean,
  }
}