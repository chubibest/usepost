import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
// validate password here
const hashpassword = password => bcrypt.hash(password, 8);

const matchpassword = (password, hashedPassword) => bcrypt.compare(password, hashedPassword);

const generateToken = id => jwt.sign(
  {
    id
  },
  process.env.SECRET, { expiresIn: '7d' }
);

const isValidEmail = email => isEmail(email);

const verifyToken = token => jwt.verify(token, process.env.SECRET);

export {
  hashpassword,
  matchpassword,
  generateToken,
  isValidEmail,
  verifyToken
};
