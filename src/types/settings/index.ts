export interface Integration {
    id: string;
    integration: string;
    name: string;
    source: string;
    entityGroup: string;
    interval: string;
    connectorUrl: string;
    icon: string;
}

export interface PaginationState {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
}
