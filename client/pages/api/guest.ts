import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import https from 'https';
import axios from 'axios';

const GuestHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const API_URI = process.env.NEXT_PUBLIC_API_URI;

    const { method } = req;
    const agent = new https.Agent({
      ca: fs.readFileSync('52.4.183.221.chained+root.crt'),
      key: fs.readFileSync('private.key'),
      cert: fs.readFileSync('certificate.crt'),
    });

    const instance = axios.create({
      httpsAgent: agent,
    });

    switch (method) {
      case 'POST':
        console.log(req);
        const response = await instance({
          method: 'POST',
          url: `${API_URI}v1/guests`,
          data: req.body,
        });

        const data_ = await response.data;

        return data_;

      case 'DELETE':
        return console.log(req.body);
    }
  } catch (error) {
    res.status(500).json({ msg: 'internal server error' });
    // console.log(error);
  }
};

export default GuestHandler;
