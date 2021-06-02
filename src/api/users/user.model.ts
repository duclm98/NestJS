import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
  accessToken: { type: String, require: false },
  refreshToken: { type: String, require: false }
});

export interface User {
  id: string;
  username: string;
  password: string;
  accessToken: string;
  refreshToken: string;
}