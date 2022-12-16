export interface PaginateInterface<Type> {
    page: number,
    perPage: number,
    countPage: number,
    sortBy: string,
    sort: string,
    total: number,
    items: Type[]
}