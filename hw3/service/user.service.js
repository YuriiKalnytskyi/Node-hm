const fs = require('fs');
const path = require('path');
const utils = require('util');

const fail = path.join(process.cwd(), 'database', 'user.json');
const writeFile = utils.promisify(fs.writeFile);
// const readFile = utils.promisify(fs.writeFile);

let users = [];

const getUsers = () => {
  users = JSON.parse(fs.readFileSync(fail).toString());
  return users;
};

getUsers();

module.exports = {
  allUser: () => getUsers(),

  getUserId: (userId) => users[userId],

  createUser: (newUser) => {
    const allUser = getUsers();
    allUser.push(newUser);
    writeFile(fail, JSON.stringify(allUser));
  }
};
