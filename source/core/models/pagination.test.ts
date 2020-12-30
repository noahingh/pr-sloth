import { Paginator } from './pagination';

describe('paginator.init', () => {
    it('set total and perPage properties', () => {
        const p = new Paginator(3, 1);

        p.reset(10, 3);
        expect(p.total).toEqual(10);
        expect(p.perPage).toEqual(3);
    })
})

describe('paginator.setPage ', () => {
    it('throws a new error if the page is out of range.', () => {
        const p = new Paginator(10, 3);

        expect(() => p.setPage(5)).toThrowError(new RangeError("5 is out of range."))
    })

    it('set the page properly', () => {
        const p = new Paginator(10, 3);

        p.setPage(4)
        expect(p.page).toEqual(4);
    })
})
