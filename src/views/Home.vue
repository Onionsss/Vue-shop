<template>
    <el-container class="home">
        <el-header>
            <div>
                <img src="@/assets/logo.png">
                <span>电商管理后台系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#409eff">
                    <el-submenu :index="item.id + ''" v-for="(item,index) in menuList" :key="item.id">
                        <template slot="title">
                            <i :class="iconList[index]"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        <el-menu-item :index="subItem.id + ''" v-for="subItem in item.children" :key="subItem.id">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>{{subItem.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>Main</el-main>
        </el-container>

    </el-container>
</template>
<script>

    import {TOKEN} from "@/constant/Constant";
    import {getLeftMenu} from "@/api/user";

    export default {
        created() {
            //获取左侧菜单
            getLeftMenu()
                .then(value => {
                    let data = value.data
                    if (data.meta.status !== 200) {
                        this.$message.error(data.meta.msg)
                    } else {
                        this.menuList = data.data
                    }
                }).catch(error => {

            })
        },
        data() {
            return {
                name: "Home组件",
                menuList: [],
                iconList: {
                    0: "el-icon-user-solid",
                    1: "el-icon-s-opportunity",
                    2: "el-icon-s-shop",
                    3: "el-icon-s-goods",
                    4: "el-icon-s-marketing",
                }
            }
        },
        methods: {
            logout() {
                //退出登录情况session里的token
                sessionStorage.removeItem(TOKEN)
                this.$router.push("/login")
            }
        }
    }
</script>
<style lang="less" scoped>
    .el-header {
        background: #696969;
        height: 80px;
        padding-left: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        color: @white;

        > div {
            display: flex;
            align-items: center;

            > img {
                height: 40px;
            }

            > span {
                margin-left: 20px;
            }
        }
    }

    .el-aside {
        background: #545c64;
    }

    .el-main {
        background: #07c160;
    }

    .home {
        height: 100%;
    }

</style>
