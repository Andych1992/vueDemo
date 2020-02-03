'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
const collection = db.collection('materialtype')
const res = await collection.orderBy("indexs", "asc").limit(999).get();
return res
};