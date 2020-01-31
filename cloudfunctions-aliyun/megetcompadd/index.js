'use strict';

const db = uniCloud.database();
exports.main = async (event, context) => {
const {compname,jname,address,contacts,tel,cpaddress,cplogo,desc} = event;	
const collection = db.collection('company')

const compInDB = await collection.where({compname:compname}).get()
	if (compInDB.data && compInDB.data.length === 0) {
		//单位不存在
		await collection.add({compname,jname,address,contacts,tel,cpaddress,cplogo,desc});
			return {
					success: true,
					code: 200,
					msg: '成功'
				}
		}else{
		//单位已存在
			return {
					success: false,
					code: 2,
					msg: '失败'
				}
		}



};
