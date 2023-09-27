import { RequestHandler, Request, Response } from 'express';
import userService from '@services/user.service';



const createUserProfile: RequestHandler = async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(201).json({ success: true, data: user });
};

const listUserProfiles: RequestHandler = async (req: Request, res: Response) => {
  const users = await userService.listUsers();

  res.json({ success: true, users });
};

const listUserProfile: RequestHandler = async (req: Request, res: Response) => {

  const { id, param } = req.params;
  const users = await userService.listUser(req, res, id, param);

  res.json({ success: true, users });
};

const updateUserProfile: RequestHandler = async(req: Request, res: Response) => {
  const { param } = req.params;
  const users = await userService.updateUser(req.body, req, res, param);
  res.json({ success: true, msg: 'Update existing User', users });
};

const deleteUserProfile: RequestHandler = async (req: Request, res: Response) => {
  const { param } = req.params;
  await userService.deleteUser(req, res, param);
  res.json({ success: true, msg: 'Deleting User', params: req.params });
};

export default { createUserProfile, listUserProfiles, listUserProfile, updateUserProfile, deleteUserProfile };
