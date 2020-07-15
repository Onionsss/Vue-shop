<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input clearable placeholder="请输入内容" maxlength="10" v-model="page.query" @input="inputChange">
                        <el-button slot="append" icon="el-icon-search" @click="getUsers"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" @click="dialogShow = true">添加用户</el-button>
                </el-col>
            </el-row>
            <el-table :data="userList" stripe border>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="姓名" prop="username" width="180"></el-table-column>
                <el-table-column label="邮箱" prop="email" width="180"></el-table-column>
                <el-table-column label="电话" prop="mobile" width="180"></el-table-column>
                <el-table-column label="角色" prop="role_name" width="180"></el-table-column>
                <el-table-column label="状态" width="180">
                    <slot slot-scope="scope">
                        <el-switch v-model="scope.row.mg_state" @change="editUser(scope.row)"></el-switch>
                    </slot>
                </el-table-column>
                <el-table-column label="操作" >
                    <slot slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditUserDialog(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row)"></el-button>
                        <el-tooltip content="权限操作" :enterable="false" placement="top">
                            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                        </el-tooltip>
                    </slot>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="sizeChange"
                    @current-change="currentChange"
                    :current-page="page.pagenum"
                    :page-sizes="[5, 10, 20]"
                    :page-size="page.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.total">
            </el-pagination>
        </el-card>
        <el-dialog title="添加用户" :visible="dialogShow" @close="dialogClear" width="40%">
            <el-form  ref="addUserRef" :rules="rules" class="add_user_form" :hide-required-asterisk="true" :model="user">
                <el-form-item prop="username" label="用户名" label-width="70px" >
                    <el-input  v-model="user.username" ></el-input>
                </el-form-item>
                <el-form-item prop="password" label="用户密码"  label-width="70px">
                    <el-input  v-model="user.password" show-password></el-input>
                </el-form-item>
                <el-form-item prop="email" label="邮箱"  label-width="70px">
                    <el-input  v-model="user.email"></el-input>
                </el-form-item>
                <el-form-item prop="mobile" label="手机号"  label-width="70px">
                    <el-input  v-model="user.mobile" ></el-input>
                </el-form-item>
                <el-form-item class="add_user_action" >
                    <el-button @click="dialogShow = false">取消</el-button>
                    <el-button type="primary" @click="addUser">添加</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog title="修改信息" :visible="editDialogShow" @close="editDialogClear" width="40%">
            <el-form  ref="editUserRef" :rules="rules" class="add_user_form" :hide-required-asterisk="true" :model="editUsers">
                <el-form-item prop="username" label="用户名" label-width="70px" >
                    <el-input  v-model="editUsers.username" disabled></el-input>
                </el-form-item>
                <el-form-item prop="email" label="邮箱"  label-width="70px">
                    <el-input  v-model="editUsers.email"></el-input>
                </el-form-item>
                <el-form-item prop="mobile" label="手机号"  label-width="70px">
                    <el-input  v-model="editUsers.mobile" ></el-input>
                </el-form-item>
                <el-form-item class="add_user_action">
                    <el-button @click="editDialogShow = false">取消</el-button>
                    <el-button type="primary" @click="editUserInfo">修改</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import { editUserStatus,getUsers,addUser,searchUser,editUserInfo } from "@/api/user";
    import {deleteUser} from "../../api/user";

    export default {
        created() {
            this.getUsers()
        },
        data() {
            //自定义校验邮箱
            let checkEmail = (rule,value,callback) => {
                let email = value.toString()
                if(email.indexOf('@') <= 0){
                    return callback(new Error('邮箱格式错误'));
                }

                //比如调用callback 不然validate方法无效
                callback()
            }
            return {
                content: '',
                page: {
                    query: "",
                    total: 0,
                    pagenum: 1,
                    pagesize: 5
                },
                userList: [],
                dialogShow: false,
                editDialogShow: false,
                user: {
                    username: "",
                    password: "",
                    email: "",
                    mobile: ""
                },
                editUsers: {

                },
                rules: {
                    username: [
                        { required: true, message: '请输入账户名', trigger: 'blur' },
                        { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        { validator: checkEmail,trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { min: 11, max: 11, message: '请输入11位手机号', trigger: 'change' }                    ]
                }
            }
        },
        methods: {
            //得到当前页数据
            getUsers() {
                getUsers(this.page)
                    .then(value => {
                        let data = value.data
                        if (data.meta.status !== 200) {
                            this.$message.error(data.meta.msg)
                        } else {
                            this.userList = data.data.users
                            this.page.total = data.data.total
                        }
                    }).catch(error => {

                })
            },
            //每页多少条发生改变
            sizeChange(val){
                this.page.pagesize = val
                this.getUsers()
            },
            //选择了某一页
            currentChange(val){
                this.page.pagenum = val
                this.getUsers()
            },
            /**
             * 修改用户状态
             * @param user
             */
            async editUser(user){
                editUserStatus(user.id,user.mg_state)
                .then(value => {
                    let data = value.data
                    if(data.meta.status !== 200){
                        this.$message.error(data.meta.msg)
                    }else {
                        this.$message.success("修改用户状态成功")
                    }
                }).catch(error => {

                })
            },
            //当输出框被清除时调用接口
            inputChange(val){
                if(val === ''){
                    this.getUsers()
                }
            },
            //清除dialog
            dialogClear(){
                this.dialogShow = false
                this.$refs.addUserRef.resetFields()
            },
            editDialogClear(){
                this.editDialogShow = false
                this.$refs.editUserRef.resetFields()
            },
            //添加用户
            async addUser(){
                //添加用户
                this.$refs.addUserRef.validate(async valid => {
                    if(valid){
                        addUser(this.user)
                            .then(val => {
                                let data = val.data
                                if(data.meta.status === 201){
                                    this.dialogClear()
                                    this.$message.success("添加用户成功")
                                }else{
                                    this.$message.error(data.meta.msg)
                                }

                            }).catch(error => {
                        })
                    }
                })


            },
            //修改用户信息
            async editUserInfo(){
                this.$refs.editUserRef.validate(valid => {
                    if(valid){
                        //修改用户信息
                        editUserInfo(this.editUsers.id,this.editUsers)
                        .then(val => {
                            let data = val.data
                            if(data.meta.status !== 200) {
                                this.$message.error(data.meta.msg)
                            }else{
                                this.$message.success(data.meta.msg)
                                //更新当前
                                this.getUsers()
                                this.editDialogShow = false
                            }
                        })
                    }
                })
            },
            //显示修改用户dialog
            async showEditUserDialog(editUser){
                searchUser(editUser.id)
                .then(val => {
                    let data = val.data
                    if(data.meta.status !== 200){
                        this.$message.error(data.meta.msg)
                        this.editDialogShow = false
                    }else{
                        this.editUsers = data.data
                        this.editDialogShow = true
                    }
                }).catch(error => {

                })

            },
            //删除用户弹窗
            async deleteUser(user){
                this.$confirm('该操作会删除该用户,是否继续?',"提示",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(val => {
                    //确认了删除
                    deleteUser(user.id)
                    .then(val => {
                        let data = val.data
                        if(data.meta.status !== 200){
                            this.$message.error(data.meta.msg)
                        }else{
                            this.$message.error(data.meta.msg)
                            this.getUsers()
                        }
                    })

                }).catch(err => {
                    //取消了删除
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .el-breadcrumb {
        margin-bottom: 15px;
    }

    .el-table {
        margin-top: 20px;
        font-size: 12px;
    }

    .el-pagination{
        margin-top: 20px;
    }

    .add_user_action{
        display: flex;
        justify-content: flex-end;
    }
</style>
