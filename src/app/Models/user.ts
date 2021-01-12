
export class User {

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
    email: string;
    password: string;


}

export class Register {
    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
    username: string;
    email: string;
    password: string;
    role: RoleType;
}
export class projects {
    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
    name: string;
    description: string;
}
export class Task {
    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
    name: string;
    description: string;

}
export enum RoleType
  {
    admin = "admin",
    user = "user"
  }
  export const UserTypeLabelMapping = {
    [RoleType.admin]: "admin",
    [RoleType.user]: "user",
    
  }
