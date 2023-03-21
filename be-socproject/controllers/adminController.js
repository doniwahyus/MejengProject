const { User } = require('../db/models');

module.exports = {
	getAllUsers: async (req, res, next) => {
		try {
			const totalUser = await User.count();
			const users = await User.findAll({
				include: 'project',
			});

			return res.status(201).json({
				status: true,
				message: 'Success get all data user',
				amountUsers: totalUser,
				data: users,
			});
		} catch (error) {
			next(error);
		}
	},
	banUser: async (req, res, next) => {
		const { id } = req.body;

		if (!id) {
			return res.status(401).json({
				status: false,
				msg: 'required body',
			});
		} else {
			const isUserExist = await User.findOne({ where: { id } });
			if (isUserExist) {
				await User.update(
					{
						is_active: false,
					},
					{
						where: {
							id,
						},
					}
				)
					.then((result) => {
						return res.status(200).json({
							status: true,
							msg: `user has been banned`,
						});
					})
					.catch((err) => {
						return res.status(401).json({
							status: false,
							msg: 'error while trying ban user',
							error: err.message,
						});
					});
			} else {
				return res.status(401).json({
					status: false,
					msg: 'user not exist',
				});
			}
		}
	},
	unBanUser: async (req, res, next) => {
		const { id } = req.body;

		if (!id) {
			return res.status(401).json({
				status: false,
				msg: 'required body',
			});
		} else {
			const isUserExist = await User.findOne({ where: { id } });
			if (isUserExist) {
				await User.update(
					{
						is_active: true,
					},
					{
						where: {
							id,
						},
					}
				)
					.then((result) => {
						return res.status(200).json({
							status: true,
							msg: 'the user is no longer banned',
						});
					})
					.catch((err) => {
						return res.status(401).json({
							status: false,
							msg: 'error while trying unban user',
							error: err.message,
						});
					});
			} else {
				return res.status(401).json({
					status: false,
					msg: 'user not exist',
				});
			}
		}
	},
};