const fs = require('fs');
const path = require('path');
const utils = require('util');

const db = require('../database/user.json');

const fail = path.join(process.cwd(), 'database', 'user.json');

const writeFile = utils.promisify(fs.writeFile);
const readFile = utils.promisify(fs.readFile);

let users = [];

const getUsers = async () => {
  const promise = await readFile(fail);
  users = JSON.parse(promise.toString());
  return users;
};

module.exports = {
  allUser: () => getUsers(),

  getUserId: (userId) => db[userId],

  createUser: async (newUser) => {
    users.push({ ...newUser, id: users.length + 1 });
    await writeFile(fail, JSON.stringify(users));
  },

  deleteUserId: async (userId) => {
    const allUser = await getUsers();

    const users1 = allUser.filter((value) => (value.id !== +userId));

    await writeFile(fail, JSON.stringify(users1));
  },
};
