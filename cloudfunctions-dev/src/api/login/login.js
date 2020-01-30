import crypto from 'crypto'
import validator from 'validator'
import jwt from 'jwt-simple'
const tokenExp = 7200000

const db = uniCloud.database()

async function login(event) {
	const {
		username,
		password
	} = event
	if (!validator.isMobilePhone(username, 'zh-CN')) {
		return {
			success: false,
			code: 400,
			msg: '请输入正确的手机号码'
		}
	} else if (!password) {
		return {
			success: false,
			code: 400,
			msg: '请输入密码'
		}
	} else {
		// Login
		const tokenSecret = crypto.randomBytes(16).toString('hex')
		const token = jwt.encode({
			username
		}, tokenSecret)

		let userUpdateResult
		const userInDB = await db.collection('user').where({
			username
		}).get()

		console.log('userInDB>>>>', userInDB);

		if (userInDB.data && userInDB.data.length === 0) {
			// 用户不存在
			// userUpdateResult = await db.collection('user').add({
			// 	username,
			// 	tokenSecret,
			// 	exp: Date.now() + tokenExp
			// })
			return {
				success: false,
				code: -1,
				msg: '用户不存在'
			}
		} else {
			// 用户存在，更新tokenSecret
			userUpdateResult = await db.collection('user').doc(userInDB.data[0]._id).set({
				tokenSecret,
				exp: Date.now() + tokenExp
			})
		}
		console.log('userUpdateResult>>>>', userUpdateResult);
		if (userUpdateResult.id || userUpdateResult.affectedDocs === 1) {
			return {
				success: true,
				code: 200,
				data: {
					token
				},
				msg: '登录成功'
			}
		}
	}
}

export {
	login as main
}
