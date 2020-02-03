// 物资类别增删改 我是群员(常州-_陈默 565036413)
'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const {
		operType,
		dataIn,
		searchKey
	} = event
	const {
		searchKey
	} = dataIn
	const collection = db.collection('materialtype')
	let res;
	switch (operType) {
		case 'list':
			if (event.searchKey != '') {
				const dbCmd = db.command;
				res = await collection.where(
					dbCmd.or({
						name: new RegExp(event.searchKey)
					}, {
						section: new RegExp(event.searchKey)
					})
				).orderBy("create_time", "desc").skip((event.page - 1) * event.pageSize).limit(event.pageSize).get();
			} else {
				res = await collection
					.orderBy("create_time", "desc").skip((event.page - 1) * event.pageSize).limit(event.pageSize).get();
			}

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
	}

};
