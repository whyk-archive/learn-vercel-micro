import { send } from 'micro'
import { router, get } from 'microrouter'
import type { ClientRequestArgs, ServerResponse } from 'http'

const DAMMY_DATA = {
  data: [
    {id: 1, name: 'Steven Paul "Steve" Jobs', founding: 'Apple Inc.'},
    {id: 2, name: 'Stephen Gary Wozniak', founding: 'Apple Inc.'},
    {id: 3, name: 'William Henry "Bill" Gates III', founding: 'Microsoft Corporation'},
    {id: 4, name: 'Paul Gardner Allen', founding: 'Microsoft Corporation'},
    {id: 5, name: 'Lawrence Edward "Larry" Page', founding: 'Google LLC'},
    {id: 6, name: 'Sergey Mikhailovich Brin', founding: 'Google LLC'},
    {id: 7, name: 'Inoue Masahiro', founding: 'Yahoo Japan Corporation'},
    {id: 8, name: 'Son Masayoshi', founding: 'SoftBank Group Corp.'},
    {id: 9, name: 'Mikitani Hiroshi', founding: 'Rakuten, Inc.'},
    {id: 10, name: 'Nishimura Hiroyuki(HIROYUKI)', founding: '2ch.net'},
  ]
}

const hello = async (_: ClientRequestArgs, res: ServerResponse): Promise<void> => await send(res, 200, {get: 200})

const api = async (req: ClientRequestArgs, res: ServerResponse): Promise<void> => {
  if (req.headers['x-api-key'] === process.env.API_KEY) {
    await send(res, 200, DAMMY_DATA)
  } else {
    await send(res, 403, `403 Forbidden`)
  }
}
const notfound = async (_: ClientRequestArgs, res: ServerResponse): Promise<void> => await send(res, 404, '404 Not Found')

export default router(
  get('/hello', hello),
  get('/api', api),
  get('/*', notfound),
)