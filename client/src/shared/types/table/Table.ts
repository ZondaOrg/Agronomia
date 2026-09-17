export interface ColumnHeader {
    key: string;
    header: string;
}

export interface Row<T> {
    id: number;
    data: T;
}

export interface PageInfo {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
}

export interface TableForm<T> {
    columns: ColumnHeader[];
    rows: Row<T>[];
    page: PageInfo;
}
