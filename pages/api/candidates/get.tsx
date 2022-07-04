import type { NextApiRequest, NextApiResponse } from 'next'
import connectionMongo from '../../../utils/connectdb'
import Get from '../../../models/candidates'
type Data = {
  name: string
}

export default async function getCandidate(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    const { name, email} = req.body;
    console.log('CONNECTING TO MONGO')
    await connectionMongo()
    console.log('CONNECTED TO MONGO')
    console.log('FETCHING DOCUMENT')
    const get = await Add.find()
    res.json({get})   
  }