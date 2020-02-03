/**
 * 物资进出库列表增删改 我是群员(道长 1459347320)
 */
'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const {
		operType,
		dataIn
	} = event
	const {
		_id,
		materOperType,
		materShowType,
		detail_balance,
		materOperUer,
		materOperCom,
		materOperDept,
		relationUser,
		relationCom,
		relationDept,
		fj_img,
		create_time,
		check_time,
		status
	} = dataIn
	const collection = db.collection('materMain')
	let res;
	switch (operType) {
		case 'add':
			const compInDB = await collection.where({
				_id: _id
			}).get()
			if (compInDB.data.length == 0) {
				const compDB = await collection.where({
					section: event.section
				}).get()
				if (compDB.data.length == 0) {

					res = await collection.add({
						materOperType,
						materShowType,
						detail_balance,
						materOperUer,
						materOperCom,
						materOperDept,
						relationUser,
						relationCom,
						relationDept,
						fj_img,
						create_time,
						check_time,
						status
					});
					if (res) {
						return {
							success: true,
							code: 200,
							msg: '添加成功'
						}
					} else {
						return {
							success: false,
							code: 500,
							msg: '添加失败'
						}
					}

				} else {
					return {
						success: false,
						code: 500,
						msg: '添加失败'
					}
				}


			} else {
				res = await collection.doc(dataIn._id).update({
					materOperType,
					materShowType,
					detail_balance,
					materOperUer,
					materOperCom,
					materOperDept,
					relationUser,
					relationCom,
					relationDept,
					fj_img,
					create_time,
					check_time,
					status
				});
				if (res) {
					return {
						success: true,
						code: 200,
						msg: '更新成功'
					}
				} else {
					return {
						success: true,
						code: 500,
						msg: '更新失败'
					}
				}

			}

			break;
		case 'get':
			if (keystr == '0') {
				res = await collection.where({
					materOperType: materOperType,
					materShowType: materShowType,
					detail_balance: detail_balance,
				}).limit(20).get()
			} else {
				res = await collection.where({
					relationDept: new RegExp(event.keystr)
				}).get()
			}
			if (res) {
				return {
					success: true,
					code: 200,
					data: res,
					msg: '成功'
				}
			} else {
				return {
					success: false,
					code: 500,
					msg: '服务器内部错误'
				}
			}

			break;
		case 'del':
			res = await collection.doc(dataIn._id).get()
			if (res.data.length == 0) {
				return {
					success: false,
					code: 2,
					msg: '数据不存在'
				}
			}
			res = await collection.doc(dataIn._id).remove()
			if (res.id || res.affectedDocs === 1) {
				return {
					success: true,
					code: 200,
					msg: '删除成功',
					data: res.result
				}
			}
			return {
				success: false,
				code: 500,
				msg: '服务器内部错误'
			}
			break;
	}
};
