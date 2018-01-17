const UserSchema = require('../models/userModel');


const tryCreateUser = async ({ email, username, checkbox }) => new Promise((resolve, reject) => {
  try {
    const requireEmail = !email;
    const requireUsername = !username;
    const requireCheckbox = !checkbox;
    const errorEmail = requireEmail ? false : await getQuestionByEmail(email) !== null;
    const errorUsername = requireUsername ? false : await getQuestionByUsername(username) !== null;

    if (requireEmail || requireUsername || errorEmail || errorUsername || requireCheckbox) {
      reject({
        requireEmail,
        requireUsername,
        requireCheckbox,
        errorEmail,
        errorUsername,
      });
    }
    else {
      const user = await createUser({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });

      resolve(user.username);
    }
  }
  catch (err) {
    console.error(err);
    reject({
      main: `An error has occured, please try again later`
    });
  }
});

const createUser = (user) => new Promise((resolve, reject) => {
  UserSchema.create(user, (err, res) => {
    err ? reject(err) : resolve(res);
  })
});

const getQuestionByUsername = (username) => new Promise((resolve, reject) => {
  UserSchema.findOne({ username }, (err, res) => {
    err ? reject(err) : resolve(res);
  });
});

const getQuestionByEmail = (email) => new Promise((resolve, reject) => {
  UserSchema.findOne({ email }, (err, res) => {
    err ? reject(err) : resolve(res);
  });
});

module.exports = {
  getQuestionByUsername,
  getQuestionByEmail,
  tryCreateUser
}