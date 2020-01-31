'use strict';

const db = uniCloud.database();
exports.main = async (event, context) => {
const {token} = event;	
const collection = db.collection('user')
const res = await collection.where({token:token}).get()
const rest = res.data[0];
const uses = {name:rest.name,company:rest.company,section:rest.section,id:rest._id,photo:rest.photo, regtime:rest.create_time}

return {
		success: true,
		code: 200,
		data:uses,
		msg: '成功'
	}
};
