const UserSchema = require('../models/userModel');

const validateAndAddUser = ({ username, email, checkbox }) => new Promise(
  async (resolve, reject) => {
    try {
      const requireEmail = !email;
      const requireUsername = !username;
      const requireCheckbox = !checkbox;
      const errorUsername = await getUserByUsername(username);
      const errorEmail = await getUserByEmail(email);

      // getUserByUsername(username)
      //   .then(user => {
      //     const errorUsername = user;
      //   })

      if (requireEmail || requireUsername || requireCheckbox || errorUsername || errorEmail) {
        reject({
          requireUsername,
          requireEmail,
          requireCheckbox,
          errorUsername,
          errorEmail
        });
      }
      else {
        const newUser = await addUser({ username, email, checkbox });
        resolve(newUser.username)
      }
    }
    catch (err) {
      console.error(err);
      reject({
        main: "An error has occured, please try again later"
      });
    }
  }
);

// const validateAndAddUser = ({ username, email, checkbox }, callback) => {
//   const requireEmail = !email;
//   const requireUsername = !username;
//   const requireCheckbox = !checkbox;
//   if (requireEmail || requireUsername || requireCheck) {
//     callback({
//       requireUsername,
//       requireEmail,
//       requireCheckbox
//     });
//   }
//   else {
//     addUser({ username, email, checkbox });
//     callback(null, username);
//   }
// }

const getUserByUsername = (username) => new Promise((resolve, reject) => {
  UserSchema.findOne({ username }, (err, user) => {
    err ? reject(err) : resolve(user)
  });
});

const getUserByEmail = (email) => new Promise((resolve, reject) => {
  UserSchema.findOne({ email }, (err, user) => {
    err ? reject(err) : resolve(user)
  });
});

const addUser = (user) => new Promise((resolve, reject) => {
  UserSchema.create(user, (err, res) => {
    err ? reject(err) : resolve(res);
  })
});

module.exports = {
  validateAndAddUser,
  getUserByEmail,
  getUserByUsername
}