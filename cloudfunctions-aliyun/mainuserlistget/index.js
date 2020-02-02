'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  const collection = db.collection('user')
  const res = await collection.get()
  return res
};