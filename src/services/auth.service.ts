import { BadRequestException, UnauthorizedException } from '@libs/errors';
import { signToken } from '@libs/jwt';
import { comparePassword, hashPassword } from '@libs/password';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  errorFormat: 'pretty',
});

interface LoginInput {
  email: string;
  password: string;
}

interface SignUpInput {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  password: string;
}

const login = async (input: LoginInput) => {
  const { email, password } = input;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !comparePassword(password, user.password))
    throw new UnauthorizedException('Incorrect credential');

  return signToken({ user: { id: user.id, email: user.email } });
};

const signUp = async (input: SignUpInput) => {
  const { first_name, last_name, username, email, phone_number, address, password } =  input;

  const existedUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existedUser)
    throw new BadRequestException('Email is already existed.');

  const user = await prisma.user.create({
    data: {
      username,
      email,
      first_name,
      last_name,
      phone_number,
      address,
      password: hashPassword(password),
    },
  });

  const token = signToken({ user: { id: user.id, ...user } });

  const data = {
    username: user.username,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    phone_number: user.phone_number,
    address: user.address,
    createdAt: user.createdAt,
    token,
  };

  return data;
};

export default { login, signUp };
