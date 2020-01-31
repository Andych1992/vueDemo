# 物资下发管理系统 数据库(初稿)
#用户管理表
#物资类别表
#物资库存表
#物资领取表
#单位列表

#图标色：1296db

#### 用户表
```
user
{
    _id: "", // string，自生成 用户唯一标识，注册时生成无法修改
    username: "", // string 用户
	company:"",//string 所属单位
	section:""//所属部门
    password: "", // string 密码(禁止明文)
    wx_open_id: "", // string 关联微信openid  用户code 换取
    id_card: "", // string 身份证号，需验证符合规则
    name: "", // string 不能为空
    phone: "", // string 不能为空，需验证符合规则
    age: 18, // int
    sex: 0, // int (0女, 1男, 2未知)
    photo: "", // string 图片url地址
    status: 0, // int 0正常 1冻结
    permission: 0, int 默认2，0超级管理员, 1普通管理员, 2普通
	power:"" //string 权限。（"1，3，4，5"）权限字符
    create_time: 0,// 时间戳 GMT
    create_ip: "",// 注册 ip
	
}
```
#### 单位列表
```
company
{
    _id: "", // string，自生成  单位ID
    compname: "", // string 单位名称
	jname:""//单位简称
	contacts:""//负责人
	tel:""//联系电话
	desc:""//备注说明
	address: {country: 0, province: 0, city: 0, district: 0, street: ""}
    create_time: 0,// 时间戳 GMT

	
}
```

#### 权限表
```
powerlist
{
    _id: "", // string，自生成
    powerid: "", // int 权限标识ID
    powername: "", // string 权限名称
	
}
```

#### 审批表
```
approvallist
{
    _id: "", // string，自生成
    guidid: "", // int 用户标识ID
    materoutid: "", // string 物资id
}
```




#### 单位部门表
```
department
{
    _id: "", // string，自生成
    compid: "", // string 单位ID
	section:""//部门名称
}
```

#### 物资类别表
```
materialtype
{
    _id: "", // string，自生成
    types:"",//物资类型
	titles:""类型名称
	indexs:0位置排列
	
}
```

#### 物资库存表
```
materModel
{
    _id: "", // string，自生成
	model_id:""唯一标识
    types_id:"",//物资类型关联
	mat_title:"",//物资名称
	mat_img:"",物资图片
	mat_des:"",物资说明
	mat_number:"",库存数量
	mat_regtime:""第一次入库时间
	mat_lasstime:""最后一次入库时间
	Model:"",//型号
	unit:"",//单位
}
```
#### 物资状态表
```
materout_tions
{
    _id: "", // string，自生成
    tions: "", // int 状态编号 1，2，3，4，0
	tionname:""//状态名称，已申请，已发放，采购中，已结束
}
```

#### 物资领取表
```
materout
{
    _id: "", // string，自生成
    model_id: "", // string 物资唯一标识，添加时生成无法修改产品编号
	guid:""//领取人谁领的
	matincomp:""//领取单位
	matname:""//物资名称
	matimg:""//物资封图
	materout_tions:1//状态
	approval:""//物资审批
	approvalcount:""//审批人数
	outnumber:0//领取数量
	outuserid:""//下发人
	outmatcomp:""下发单位
	mattime:""//下发时间
	address: {country: 0, province: 0, city: 0, district: 0, street: ""},（下发信息）
	matdes:""//详情说明
	mattypes:0//领取类型，是进还是出

}
```






#### 成员操作历史
```
// 增加人员时需要写入
member_opera_history
{
    _id: "", // string，自生成
	materout:0//领取时的流水id
    user_guid: "", // string 用户唯一标识
    member_id: 0, // string 成员唯一标识
    status: 0, // int 0新增，1删除
    create_time: 0, // int 时间戳 GMT
    create_ip: "", // string 当前操作ip
}
```
