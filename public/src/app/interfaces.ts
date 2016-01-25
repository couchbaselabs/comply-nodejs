export interface IUser {
    _id?: string,
    name: {
        first: string,
        last: string
    },
    address: {
        street: string,
        city: string,
        state: string,
        zip: string,
        country: string
    },
    email: string,
    phone: string,
    password: string,
    company: Object
}

export interface ITask {
    _id?: string,
    name: string,
    description: string,
    owner: IUser,
    assignedTo: Object,
    users: Array<Object>,
    history: Array<Object>
}

export interface IProject {
    _id?: string,
    name: string,
    description: string,
    owner: IUser,
    users: Array<Object>,
    tasks: Array<Object>
}

export interface ICompany {
    _id?: string,
    name: string,
    address: {
        street: string,
        city: string,
        state: string,
        zip: string,
        country: string
    }
    phone: string,
    website: string
}
