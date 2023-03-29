const {
	User,
	Project,
	Tools,
	ProjectTools,
	Categories,
} = require('../db/models');
const fs = require('fs');
const path = require('path');

module.exports = {
	getProfile: async (req, res, next) => {
		try {
			await User.findOne({
				where: { id: req.user.id },
				attributes: { exclude: ['password'] },
				include: {
					model: Project,
					as: 'project',
					include: [
						{
							model: Tools,
							as: 'tools',
							attributes: ['name'],
							through: {
								model: ProjectTools,
								as: 'projcetTools',
								attributes: { exclude: ['createdAt', 'updatedAt'] },
							},
						},
						{
							model: Categories,
							as: 'categories',
							attributes: { exclude: ['id', 'slug', 'createdAt', 'updatedAt'] },
						},
					],
				},
			}).then((result) => {
				return res.status(200).json({
					code: 200,
					status: 'OK',
					message: 'Success get profile',
					projectAmmount: result.project.length,
					data: result,
				});
			});
		} catch (err) {
			return res.status(500).json({
				code: 500,
				status: 'Internal Server Error',
				error: {
					message: err.message,
				},
			});
		}
	},
	updateProfile: async (req, res, next) => {
		const { id } = req.user;
		const { name, desc, region, country } = req.body;
		const user_image = req.file;

		const user = await User.findOne({
			where: { id },
			attributes: { exclude: ['password'] },
		});

		try {
			if (user_image) {
				if (user.profile_image.includes('api')) {
					await User.update(
						{
							name,
							description: desc,
							region,
							country,
							profile_image: user_image.path,
						},
						{ where: { id } }
					);
				} else {
					fs.unlinkSync(path.normalize(user.profile_image));
					await User.update(
						{
							name,
							description: desc,
							region,
							country,
							profile_image: user_image.path,
						},
						{ where: { id } }
					);
				}
			} else {
				await User.update(
					{
						name,
						description: desc,
						region,
						country,
					},
					{ where: { id } }
				);
			}

			return res.status(200).json({
				code: 200,
				status: 'OK',
				message: 'Success update profile',
			});
			// end logic
		} catch (err) {
			if (user_image) {
				fs.unlinkSync(user_image.path);
			}
			console.log(err);
			return res.status(500).json({
				code: 500,
				status: 'Internal Server Error',
				error: {
					message: err.message,
				},
			});
		}
	},
};
