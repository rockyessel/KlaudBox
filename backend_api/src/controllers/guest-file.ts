import Express from 'express';

export const GuestPost = async (request: Express.Request, response: Express.Response) => {
  console.log(request);
  response.json({ file: request.file });
};

export const GuestGet = async (_request: Express.Request, response: Express.Response) => {
  response.json('ok');
};
