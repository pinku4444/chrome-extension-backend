import { IPermissions, } from './interfaces';
export const permissions: IPermissions = {
    getUsers: {
        all: ['admin'],
        delete: [],
        read: ['user', 'admin'],
        write: ['admin'],
    },
};
