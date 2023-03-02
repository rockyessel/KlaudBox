import { Request, Response } from 'express';
import { User } from '../models/user-file';
import bcrypt from 'bcrypt';
import validator from 'validator';

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
    // Validator
    // if (!validator.isEmail(email)) {
    //   response.status(404).json({ error: true, msg: 'Email is not valid' });
    // }

    // if (!validator.isStrongPassword(password)) {
    //   response.status(404).json({ error: true, msg: 'Password not strong' });
    // }

    const ifExist = await User.findOne({ email });

    if (ifExist) {
      response
        .status(404)
        .json({ error: true, msg: `User exist with this email:${email}` });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);

    const createdUser = await User.create({ email, password: hashed_password });

    console.log(createdUser);

    response
      .status(201)
      .json({ success: true, msg: 'Account Created', user: createdUser });
  } catch (error) {
    console.log(error);
  }
};

export const UserLogin = async (request: Request, response: Response) => {
  try {
    response.status(201).json({ msg: 'Logged' });
  } catch (error) {
    console.log(error);
  }
};
