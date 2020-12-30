import { immerable } from "immer"

export class Paginator {
    [immerable] = true;
    total: number;
    page: number;
    perPage: number;

    constructor(total: number, perPage: number = 3) {
        this.total = total;
        this.page = 1;
        this.perPage = perPage;
    }

    reset( total: number, perPage: number = 3): void {
        this.total = total;
        this.page = 1;
        this.perPage = perPage;
    }

    setPage(page: number): void | never {
        const max = Math.ceil(this.total / this.perPage);

        if (!(page >= 1 && page <= max)) {
            throw new RangeError(`${page} is out of range.`)
        }

        this.page = page;
    }
}
