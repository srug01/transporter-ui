export interface Where {
    or?: any;
}

export interface Scope {
    offset: number;
    limit: number;
    skip: number;
    order: Array<string>;
    where: Where;
    fields: any;
}

export interface Include {
    relation: string;
    scope: Scope
}

export interface Filter {
    offset: number;
    limit: number;
    skip: number;
    order: Array<string>;
    where: Where;
    fields: any;
    include: Array<Include>;
}