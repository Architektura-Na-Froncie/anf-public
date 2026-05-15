import { v4 as uuid } from 'uuid'

export const getShortId = () => uuid().split('-')[0]
