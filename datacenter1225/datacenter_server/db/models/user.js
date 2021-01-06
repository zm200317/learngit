/*
用来定义用户登录UserModel模型
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var userSchema = new Schema({
    useremail:{type:String},
    username:{type:String},//用户名
    password:{type:String,require:true},//密码
    checkCode:{type:String,require:true},//密码
    type:{type:String,default:'内部员工'},//用户类型：VIP/普通用户/内部员工/管理员
    headerImg:{type:String},//头像
    satelliteCollection:[]
})
//定义模型
var UserModel = mongoose.model('user',userSchema)//用户集合名称是users
module.exports = UserModel
