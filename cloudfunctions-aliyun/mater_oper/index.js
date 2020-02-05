/**
 * 物资进出库列表增删改 我是群员(道长 1459347320)
 */
'use strict';
const db = uniCloud.database();
const dbb = uniCloud.database();
exports.main = async (event, context) => {
	const {
		operType,
		dataIn,
		dataInDetail
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
		status,
		page,
		pageSize,
		searchKey
	} = dataIn
	const collection = db.collection('materMain')
	let res;
	var serialNumber = 'Z' + Date.parse(new Date());
	switch (operType) {
		case 'add':
			if (!_id) {
				//添加主表
				res = await collection.add({
					serialNumber,
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
				if (res.id || res.affectedDocs === 1) {
					var main_ID = res.id;
					var resDetails = [];
					try {
						//添加明细
						dataInDetail.forEach((currentValue, index, arr) => {
							arr[index].materMain_id = main_ID;
							arr[index].detail_balance = detail_balance;
							delete arr[index]["_id"];
							dbb.collection('materDetail').add({
									materMain_id: arr[index].materMain_id,
									detail_balance: arr[index].detail_balance,
									materModel_id: arr[index].materModel_id,
									types_id: arr[index].types_id,
									mat_title: arr[index].mat_title,
									mat_img: arr[index].mat_img,
									unit: arr[index].unit,
									model: arr[index].model,
									manufacturer: arr[index].manufacturer,
									bar_code_number: arr[index].bar_code_number,
									mat_top: arr[index].mat_top,
									mat_number: arr[index].mat_number,
									mat_des: arr[index].mat_des
								})
								.then((resDetail) => {
									resDetails[index] = resDetail
									if (!resDetail.id || resDetail.affectedDocs != 1) {
										throw new Error(resDetail);
									}
								});
						});
					} catch (error) {
						return {
							success: false,
							code: 500,
							msg: '明细添加失败' + error.message,
							err: error.message
						}
					}
					return {
						success: true,
						code: 200,
						data: resDetails,
						msg: '添加成功'
					}
				} else {
					return {
						success: false,
						code: 500,
						msg: '添加失败',
						err: res
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
					status,
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
			if (searchKey && !materShowType) {
				res = await collection.where({
					materOperType: materOperType,
					relationDept: new RegExp(searchKey)
				}).orderBy("create_time", "desc").skip((page - 1) * pageSize).limit(pageSize).get();
			} else if (!searchKey && materShowType) {
				res = await collection.where({
					materOperType: materOperType,
					materShowType: materShowType
				}).orderBy("create_time", "desc").skip((page - 1) * pageSize).limit(pageSize).get();
			} else if (!searchKey && !materShowType) {
				res = await collection.where({
					materOperType: materOperType
				}).orderBy("create_time", "desc").skip((page - 1) * pageSize).limit(pageSize).get();
			} else if (searchKey && materShowType) {
				res = await collection.where({
					materOperType: materOperType,
					relationDept: new RegExp(searchKey),
					materShowType: materShowType
				}).orderBy("create_time", "desc").skip((page - 1) * pageSize).limit(pageSize).get();
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
