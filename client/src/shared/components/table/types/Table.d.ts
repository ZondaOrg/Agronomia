export interface ColumnHeader {
    key: string;
    header: string;
}

export interface DataRow<T> {
    id: number;
    data: T;
    actions?: React.ReactNode;
}

export interface TablePaginator<T> {
    columns: ColumnHeader[];
    rows: DataRow<T>[];
    nameElements: string;
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
}
