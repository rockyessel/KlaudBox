import { Request, Response } from 'express';
import { User } from '../models/user-file';
import * as bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';

// console.log(`${process.env.JWT_SECRET_TOKEN}`);

const GenToken = (_id: any) => {
  return jwt.sign({ _id }, `${process.env.JWT_SECRET_TOKEN}`, {
    expiresIn: '3d',
  });
};

export const UserSignUp = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    const empty =
      email === '' ||
      email === null ||
      email === undefined ||
      password === '' ||
      password === undefined ||
      password === null;

    if (empty) {
      response.status(404).json({ msg: 'Email/Password cannot be blank' });
    }

    const ifExist = await User.findOne({ email });

    if (ifExist) {
      response
        .status(404)
        .json({ error: true, msg: `User exist with this email:${email}` });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);

    const createdUser = await User.create({ email, password: hashed_password });

    const token = GenToken(createdUser._id);

    response.status(201).json({
      success: true,
      email,
      _id: createdUser._id,
      token,
    });
  } catch (error) {
    response.status(500).json({ msg: 'Internal error', location: 'register' });
  }
};

export const UserLogin = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;

    const empty =
      email === '' ||
      email === null ||
      email === undefined ||
      password === '' ||
      password === undefined ||
      password === null;

    if (empty) {
      response.status(404).json({ msg: 'Email/Password cannot be blank' });
    }

    const ifExist = await User.findOne({ email });

    if (!ifExist || ifExist === null) {
      response
        .status(404)
        .json({ error: true, msg: `User exist with this email:${email}` });
    }

    const compare = await bcrypt.compare(password, `${ifExist?.password}`);

    if (!compare) {
      response.status(404).json({ error: true, msg: `Password is incorrect` });
    }

    const token = GenToken(ifExist?._id);

    response
      .status(201)
      .json({ success: true, email, _id: ifExist?._id, token });
  } catch (error) {
    response.status(500).json({ msg: 'Internal error', location: 'login' });
  }
};

export const ForgotUserPassword = async (
  request: Request,
  response: Response
) => {
  try {
    const { email } = request.params;

    const empty = email === '' || email === null || email === undefined;

    if (empty) {
      response.status(404).json({ msg: 'Email was blank' });
    }

    const user = await User.findOne({ email });

    if (!user || user === null) {
      response.status(404).json({ error: true, msg: `User doesn't exist` });
    }

    const token = GenToken(user?._id);
  } catch (error) {
    response
      .status(500)
      .json({ msg: 'Internal error', location: 'forgot password' });
  }
};
