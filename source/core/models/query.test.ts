import { QueryBuilder, Role } from './query';

describe('QueryBuilder.buildQuery', () => {
    it('returns the default query', () => {
        const builer = new QueryBuilder();
        builer.login = 'hanjunlee'

        const q = builer.buildQuery();
        expect(q).toBe('is:open author:hanjunlee archived:false')
    })

    it('returns the assignee role', () => {
        const builer = new QueryBuilder({
            role: Role.Assignee,
            login: 'hanjunlee',
        });

        const q = builer.buildQuery()
        expect(q).toBe('is:open assignee:hanjunlee archived:false')

    })
})
