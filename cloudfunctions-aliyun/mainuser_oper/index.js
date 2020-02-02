'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const {
		operType,
		dataIn
	} = event
	const {
		_id,
		photo,
		_ids,
		name,
		phone,
		age,
		sex,
		company,
		section,
		desc
	} = dataIn
	const collection = db.collection('user')
	let res;
	switch (operType) {
		case 'add':
			res = await collection.add({
				photo,
				_ids,
				name,
				phone,
				age,
				sex,
				company,
				section,
				desc
			})
			if (res.id || res.affectedDocs === 1) {
				return {
					success: true,
					code: 200,
					msg: '保存成功'
				}
			}
			return {
			  success: false,
			  code: 500,
			  msg: '服务器内部错误'
			}
			break;
		case 'save':
			res = await collection.doc(dataIn._id).get()
			if (res.data.length == 0) {
				return {
					success: false,
					code: 2,
					msg: '用户不存在'
				}
			}
			//存在
			res = await collection.doc(dataIn._id).set({
				photo,
				_ids,
				name,
				phone,
				age,
				sex,
				company,
				section,
				desc
			});
			if (res.id || res.affectedDocs === 1) {
				return {
					success: true,
					code: 200,
					msg: '保存成功',
					data: res.result
				}
			}
			return {
			  success: false,
			  code: 500,
			  msg: '服务器内部错误'
			}
			break;
		case 'del':
			res = await collection.doc(dataIn._id).get()
			if (res.data.length == 0) {
				return {
					success: false,
					code: 2,
					msg: '用户不存在'
				}
			}
			res = await collection.doc(dataIn._id).remove()
			if (res.id || res.affectedDocs === 1) {
				return {
					success: true,
					code: 200,
					msg: '操作成功',
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
