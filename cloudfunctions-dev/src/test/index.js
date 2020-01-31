const bcrypt = require('bcryptjs')

const password = bcrypt.hashSync('123456', bcrypt.genSaltSync(10))
const flag = bcrypt.compareSync('123456', password)

console.log(flag)


