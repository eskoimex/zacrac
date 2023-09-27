import { BadRequestException } from '@libs/errors';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  errorFormat: 'pretty',
});

interface CreateInput {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
}


const createUser = async (input: CreateInput) => {
  const { first_name, last_name, username, email, phone_number, address } =input;
  
  const existedUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existedUser)
    throw new BadRequestException('Username is already existed.');

  const user = await prisma.user.create({
    data: {
      username,
      email,
      first_name,
      last_name,
      phone_number,
      address,
    },
  });

  return user;
};


const listUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const listUser = async (req: Request, res: Response, id: string, param: string) => {
  console.log(param)
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { username: param },
        { email: param },
        { id: param },
      ],
    },
  });
  if (!user) {
    return res.status(404).json({ error: 'User profile not found' });
  }
  res.json(user);
};

const updateUser = async (input: CreateInput, req: Request, res: Response, param: string) => {
  const { first_name, last_name, username, email, phone_number, address } = input;
  const user = await prisma.user.updateMany({
    where: {
      OR: [
        { username: param },
        { email: param },
        { id: param },
      ],
    },
    data: {
      username,
      email,
      first_name,
      last_name,
      phone_number,
      address,
    },
  });
  res.json(user);

};

const deleteUser = async (req: Request, res: Response, param: string) => {
  console.log(param)
  const user = await prisma.user.deleteMany({
    where: {
      OR: [
        { username: param },
        { email: param },
        { id: param },
      ],
    },
  });

  res.json(user);
};

export default { createUser, listUsers, listUser, updateUser, deleteUser };
