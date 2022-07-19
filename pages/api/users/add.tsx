import type { NextApiRequest, NextApiResponse } from 'next'
import connectionMongo from '../../../utils/connectdb'
import Users from '../../../models/users'
type Data = {
  name: string
}

export default async function addUser(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name, email} = req.body;
  await connectionMongo()
  const add = await Users.create(req.body)
  res.json({add})   
}
