'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {  
  const compction = db.collection('company');
  const rescp = await compction.get()
  
  const deptction = db.collection('department')
  const resde = await deptction.get()
  
  return {
  		success: true,
  		code: 200,
  		data:{
			comp:rescp.data,
			dept:resde.data
		},
  		msg: '成功'
  	}
};
