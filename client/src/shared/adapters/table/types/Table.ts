export interface ColumnHeaderDTO {
    key: string;
    header: string;
}

export interface RowDTO<T> {
    id: number;
    data: T;
}

export interface PageInfoDTO {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
}

export interface TableResponseDTO<T> {
    id: number;
    nameList: string;
    payments: {
        columns: ColumnHeaderDTO[];
        rows: RowDTO<T>[];
        page: PageInfoDTO;
    };
}
