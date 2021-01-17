import { Query } from '../global'

export const buildQuery = (query: Query): string => {
    const open = (query.opened) ? 'is:open' : 'is:close'
    const archived = (query.archived) ? 'archived:true' : 'archived:false'

    const q = `is:pr ${open} ${query.role}:${query.login} ${archived}`
    return q
}
