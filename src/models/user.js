export class User {}
User.schema = {
    name: 'User',
    properties: {
        name: { type: 'string'},
    }
};

export class NoUser {}
User.schema = {
    name: 'NoUser',
    properties: {
        name: { type: 'string'},
    }
};