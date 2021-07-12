const { Schema, model } = require('mongoose');

const { databaseTablesEnum } = require('../constants');

const oAuthShema = new Schema({
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: databaseTablesEnum.USER
  },
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

oAuthShema.pre('find', function() {
   this.populate('user');
});

oAuthShema.pre('findOne', function() {
   this.populate('user');
});

module.exports = model(databaseTablesEnum.O_AUTH, oAuthShema);
