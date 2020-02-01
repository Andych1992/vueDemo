/**
 * @name register.js
 * @author SunSeekerX
 * @time 2020-01-31 19:27:07
 * @LastEditors SunSeekerX
 * @LastEditTime 2020-02-01 12:37:46
 */

import bcrypt from 'bcryptjs'
import validator from 'validator'

const db = uniCloud.database()

/**
 * @name 注册函数
 * @param {*} event
 */
async function register(event) {
  try {
    // 获取参数
    const { username, password, name } = event

    // 校验参数
    if (!validator.isMobilePhone(username, 'zh-CN')) {
      return {
        success: false,
        code: 400,
        msg: '请输入正确的手机号码'
      }
    } else if (!password) {
      return {
        success: false,
        code: 400,
        msg: '请输入密码'
      }
    } else {
      // 参数校验通过
      const userInDB = await db
        .collection('user')
        .where({
          username
        })
        .get()

      if (userInDB.data && userInDB.data.length === 0) {
        // 用户不存在，注册
        const bcryptPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        const registerResult = await db.collection('user').add({
          username,
          password: bcryptPassword,
          name,
          status: 0,
          permission: 0,
          create_time: new Date().getTime(),
          company: '0',
          section: '0',
          wx_open_id: '0',
          id_card: '0',
          phone: '0',
          age: '0',
          sex: '0',
          photo: '0',
          power: '0'
        })

        return {
          success: true,
          code: 200,
          msg: '注册成功',
          data: registerResult
        }
      } else {
        return {
          success: false,
          code: -1,
          msg: '用户已存在'
        }
      }
    }
  } catch (error) {
    return {
      success: false,
      code: 500,
      msg: '服务器内部错误',
      err: error.message
    }
  }
}

export { register as main }
