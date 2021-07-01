const { Schema, model } = require('mongoose');

const { databaseTablesEnum } = require('../constants');

const userShema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    select: false
  },
}, { timestamps: true });

module.exports = model(databaseTablesEnum.USER, userShema);
