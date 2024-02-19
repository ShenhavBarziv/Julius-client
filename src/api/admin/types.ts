export type UserTypeWithoutPassword = {
    _id: string
    email: string,
    name: string,
    job: string,
    birthDate: string,
    phoneNumber: string,
    position: string,
    hireDate: string,
    admin: boolean,
};
export type UserType = {
    _id: string,
    name: string,
    password: string,
    job: string,
    email: string,
    position: string,
    phoneNumber: string,
    hireDate: string,
    birthDate: string,
    admin: boolean
};