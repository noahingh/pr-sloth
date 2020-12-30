import { immerable } from "immer"

export class Paginator {
    [immerable] = true
    total: number;
    page: number;
    perPage: number;

    constructor(props: {
        total: number;
        perPage: number;
    }) {
        this.total = props.total;
        this.page = 1;
        this.perPage = props.perPage;
    }

    reset(props: {
        total: number;
        perPage: number;
    }): void {
        this.total = props.total;
        this.page = 1;
        this.perPage = props.perPage
    }

    setPage(page: number): void | never {
        const max = Math.ceil(this.total / this.perPage);

        if (!(page >= 1 && page <= max)) {
            throw new RangeError(`${page} is out of range.`)
        }

        this.page = page;
    }
}
