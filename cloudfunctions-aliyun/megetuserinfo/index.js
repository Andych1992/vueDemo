'use strict';

const db = uniCloud.database();
exports.main = async (event, context) => {
	// const {
	// 	token
	// } = event;
	// const collection = db.collection('user')
	// const res = await collection.where({
	// 	tokenSecret: token
	// }).get()
	const collection = db.collection('user')
	const res = await collection.limit(1).doc(event._id).get()
	const rest = res.data[0];
	
	const compction = db.collection('company')
	const rescp = await compction.limit(1).doc(_id:rest.company).get()
	const restcp = rescp.data[0];
	
	const dection = db.collection('department')
	const resde = await dection.limit(1).doc(_id:rest.section).get()
	const restde = resde.data[0];
	
	const uses = {
		name: rest.name,
		company: restcp.compname,
		section: restde.section,
		_id: rest._id,
		photo: rest.photo,
		regtime: rest.create_time,
		sname:rest.sname,
		id_card:rest.id_card,
		phone:rest.phone,
		age:rest.age,
		desc:rest.desc,
		sex:rest.sex
	}

	return {
		success: true,
		code: 200,
		data: uses,
		msg: '成功'
	}
};
