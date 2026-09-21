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

export interface Table<T> {
    columns: ColumnHeader[];
    rows: Row<T>[];
    page: PageInfo;
}

export const getEmptyTable = <T>(defaultSize = 10): Table<T> => ({
    columns: [],
    rows: [],
    page: {
        page: 0,
        size: defaultSize,
        totalElements: 0,
        totalPages: 0,
        first: true,
        last: true,
    },
});
