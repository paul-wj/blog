export interface IAnyData {
    [propsName: string]: any;
}

export interface IReduxAction<T> {
    type: string;
    payload: Pick<T, keyof T>;
}

export interface RequestPageBody {
    limit: number;
    offset: number;
}

export type PageListResponse<T> = { items: T[], total: number };
