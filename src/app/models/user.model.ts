export interface User {
    email: string,
    password: string,
    name: string,
    lastname: string,
    document: string,
    documentType: string,
    cellphone: string,
    person?: string,
}
export interface Person {
    _id: string,
    name: string,
    lastname: string,
    document: string,
    documentType: string,
    cellphone: string, 
}

export interface Rol {
    name: string,
    description: string,
    _id: string,
}

export interface FullUser {
    _id: string,
    email: string,
    password: string,
    person: Person,
    rol?: Rol
}