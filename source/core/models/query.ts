import { immerable } from "immer";

export class QueryBuilder {
    [immerable] = true;
    role: Role;
    login: string;
    opened: boolean;
    archived: boolean;

    constructor(props?: {
        role?: Role;
        login?: string;
        opened?: boolean;
        archived?: boolean;
    }) {
        this.role = (props?.role) ? props.role : Role.Author;
        this.login = (props?.login) ? props.login : "";
        this.opened = (props?.opened) ? props.opened : true;
        this.archived = (props?.archived) ? props.archived : false;
    }

    buildQuery(): string {
        const role = this.getRoleString();
        const login = this.login;
        const open = (this.opened) ? 'is:open' : 'is:close'
        const archived = (this.archived) ? 'archived:true' : 'archived:false'
        const q = `is:pr ${open} ${role}:${login} ${archived}`

        return q
    }

    private getRoleString() {
        const role = this.role;

        if (role == Role.Author) {
            return 'author';
        } else if (role == Role.Assignee) {
            return 'assignee';
        } else if (role == Role.Mentions) {
            return 'mentions';
        } else if (role == Role.ReviewRequested) {
            return 'review-requested'
        }

        return 'author'
    }
}

export enum Role {
    Author = 0,
    Assignee,
    Mentions,
    ReviewRequested,
}
