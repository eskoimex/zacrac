import { RequestHandler, Request, Response } from 'express';

import authService from '@services/auth.service';

const login: RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.login({ email, password });

  res.json({ success: true, user });
};


const signup: RequestHandler = async (req: Request, res: Response) => {
  const { first_name, last_name, username, email, phone_number, address, password  } = req.body;
  const user = await authService.signUp({ first_name, last_name, username, email, phone_number, address, password  });

  res.json({ success: true, user });
};

export default { login, signup };
