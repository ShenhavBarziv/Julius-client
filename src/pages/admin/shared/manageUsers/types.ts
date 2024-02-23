export type UserTypeWithoutPassword = {
    _id: string
    name: string;
    job: string;
    email: string;
    position: string;
    phoneNumber: string;
    hireDate: string;
    birthDate: string;
    admin: boolean;
};
export type UserTypeWithoutPasswordAndId = {
    name: string;
    job: string;
    email: string;
    position: string;
    phoneNumber: string;
    hireDate: string;
    birthDate: string;
    admin: boolean;
};