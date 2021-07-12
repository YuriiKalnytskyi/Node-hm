const { code, emailActionsEnum } = require('../constants');
const { passwordHesher, fileHelper, userHelper } = require('../helpers');
const { userServices, mailServices } = require('../services');

module.exports = {
  getAllUser: async (req, res, next) => {
    try {
      const users = await userServices.allUsers();
      res.json(users);
    } catch (err) {
      next(err);
    }
  },
  getUserId: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await userServices.findUserId({ _id: userId });
      res.json(user);
    } catch (e) {
      next(e);
    }
  },
  createUser: async (req, res, next) => {
    try {
      const { avatar, body: { password, email } } = req;
      const hashedPassword = await passwordHesher.hash(password);
      const createdUser = await userServices.createUser({ ...req.body, password: hashedPassword });
      const { _id } = createdUser;

      if (avatar) {
        const { finalPath, photoPath } = await fileHelper.fileDownload(avatar.name, _id, 'users', 'avatar');

        await avatar.mv(finalPath);

        await userServices.updateUserById({ _id }, { avatar: photoPath });
      }

      await mailServices.sendMail(email, emailActionsEnum.WELCOME, { userName: email });

      const normalizedUser = userHelper.userNormalizator(createdUser.toJSON());

      res.status(code.CREATED).json(normalizedUser);
    } catch (e) {
      next(e);
    }
  },
  deleteUserId: async (req, res, next) => {
    try {
      const { email } = req.user;
      await userServices.deleteUserId({ _id: req.params.userId });
      await mailServices.sendMail(email, emailActionsEnum.DELETE, { userName: email });

      res.json('deleteUser');
    } catch (e) {
      next(e);
    }
  },
  updateUserById: async (req, res, next) => {
    try {
      const { password, email } = req.body;

      if (password) {
        const hashedPassword = await passwordHesher.hash(password);
        req.body = { ...req.body, password: hashedPassword };
      }
      await userServices.updateUserById(req.params.userId, req.body);
      await mailServices.sendMail(email, emailActionsEnum.UPDATE, { userName: email });

      res.status(code.UPDATED).json('user update');
    } catch (e) {
      next(e);
    }
  },
  addAvatar: async (req, res, next) => {
    try {
      const { avatar, user: { _id }, user } = req;
      if (avatar) {
        const { finalPath, photoPath } = await fileHelper.fileDownload(avatar.name, _id, 'users', 'avatar');

        await avatar.mv(finalPath);

        await userServices.updateUserById({ _id }, { avatar: photoPath });
      }

      res.json(user);
    } catch (e) {
      next(e);
    }
  },
  addGallery: async (req, res, next) => {
    try {
      const { photos, user: { _id, photo } } = req;
      let photoArr = [];

      for (let i = 0; i < photo.length; i++) {
        photoArr = photo[i];
      }

      if (photos) {
        for (let i = 0; i < photos.length; i++) {
          // const photo1 = photos[i];

          // eslint-disable-next-line no-await-in-loop
          const { finalPath, photoPath } = await fileHelper.fileDownload(photos[i].name, _id, 'users', 'photo');

          // eslint-disable-next-line no-await-in-loop
          await photos[i].mv(finalPath);

          photoArr.push(photoPath);
        }
        await userServices.updateUserById({ _id }, { photo: photoArr });
        res.json('photo added');
      }
    } catch (e) {
      next(e);
    }
  }

};
