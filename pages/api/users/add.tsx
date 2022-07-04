import type { NextApiRequest, NextApiResponse } from 'next'
import connectionMongo from '../../../utils/connectdb'
import Add from '../../../models/users'
type Data = {
  name: string
}

export default async function addUser(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name, email} = req.body;
  console.log('CONNECTING TO MONGO')
  await connectionMongo()
  console.log('CONNECTED TO MONGO')
  console.log('CREATING DOCUMENT')
  const add = await Add.create(req.body)
  res.json({add})   
}
