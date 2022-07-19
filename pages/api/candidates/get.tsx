import type { NextApiRequest, NextApiResponse } from 'next'
import Get from '../../../models/candidates'
import Users from '../../../models/users'; 
import dbConnect from '../../../utils/connectdb';
dbConnect()
export default async function GetCandidate(
    req: NextApiRequest,
    res: NextApiResponse) {
    const { method } = req;
    switch(method ){
      case 'GET':
        try{
          const candidates = await Get.find({})
          res.status(200).json({ success: true, data: candidates})
        } catch(err){
            res.status(400).json({ success: false });
        }
        res.status(400).json({ success: false })
        break;
    } 
}

