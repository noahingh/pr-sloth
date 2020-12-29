import { Paginator } from './pagination';

describe('paginator.setPage ', () => {
    it('throws a new error if the page is out of range.', () => {
        const p = new Paginator({ total: 10, perPage: 3 });

        expect(() => p.setPage(5)).toThrowError(new RangeError("5 is out of range."))
    })

    it('set the page properly', () => {
        const p = new Paginator({ total: 10, perPage: 3 });

        p.setPage(4)
        expect(p.page).toEqual(4);
    })
})
