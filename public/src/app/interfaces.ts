export interface IUser {
    id?: string,
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
    id?: string,
    name: string,
    description: string,
    owner: string,
    assignedTo: string,
    users: Array<Object>,
    history: Array<Object>
}

export interface IProject {
    id?: string,
    name: string,
    description: string,
    owner: string,
    users: Array<Object>,
    tasks: Array<Object>
}
