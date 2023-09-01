import mongoose from 'mongoose';
import createHmac from 'node:crypto';

// define schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: string,
      trim: true,
      required: true,
      max: 32,
    },
    email: {
      type: string,
      trim: true,
      required: true,
      max: 32,
      unique: true,
      lowercase: true,
    },
    hashedPassword: {
      type: string,
      required: true,
    },
    salt: string,
    role: {
      type: string,
      default: 'subscriber',
    },
    resetPasswordLink: {
      data: string,
      default: '',
    },
  },
  { timestamps: true }
);

// virtual schema fields
userSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password, this.salt);
  })
  .get(function () {
    return this._password;
  });

// methods that interact with schema
userSchema.methods = {
  authenticate: function (plainTextPassword) {
    return this.encryptPassword(plainTextPassword) === this.hashedPassword;
  },

  encryptPassword: function (password, salt) {
    if (!password) {
      return '';
    }
    try {
      return createHmac('sha1', salt).update(password).digest('hex');
    } catch (error) {
      return '';
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf * Math.random()) + '';
  },
};

export default mongoose.model('User', userSchema);
