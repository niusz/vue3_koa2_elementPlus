<template>
  <div class="user-manage">
    <div class="query-form">
      <el-form :inline="true" :model="user" ref="form">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="user.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="user.userName" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="用户状态" prop="state">
          <el-select v-model="user.state">
            <el-option :value="0" label="所有"></el-option>
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="2" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary">新增</el-button>
        <el-button type="danger">批量删除</el-button>
      </div>
      <el-table :data="userList">
        <el-table-column type="selection" width="55" />
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        />
        <el-table-column label="操作" width="150">
          <template #default>
            <el-button @click="handleClick" size="mini">编辑</el-button>
            <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        layout="prev,pager,next"
        :total="pager.total"
        :page-size="pager.pageSize"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
export default {
  name: "user",
  setup() {
    // 获取composition API上下文对象
    const { proxy } = getCurrentInstance();
    // 初始化用户表单对象
    const user = reactive({ state: 0 });
    // 初始化
    const userList = ref([]);
    const columns = reactive([
      {
        label: "用户ID",
        prop: "userId",
      },
      {
        label: "用户名称",
        prop: "userName",
      },
      {
        label: "用户角色",
        prop: "role",
      },
      {
        label: "用户状态",
        prop: "state",
      },
      {
        label: "注册时间",
        prop: "createTime",
      },
      {
        label: "最后登录时间",
        prop: "lastLoginTime",
      },
    ]);
    const pager = reactive({
      pageNum: 1,
      pageSize: 10,
    });
    onMounted(() => {
      getUserList();
    });
    // 获取用户列表
    const getUserList = async () => {
      let params = { ...user, ...pager };
      try {
        const { list, page } = await proxy.$api.getUserList(params);
        userList.value = list;
        pager.total = page.total;
      } catch (error) {}
    };
    // 查询事件
    const handleQuery = () => {
      getUserList();
    };
    // 重置查询表单
    const handleReset = () => {
      proxy.$refs.form.resetFields();
    };

    // 分页事件处理
    const handleCurrentChange = (current) => {
      pager.pageNum = current;
      getUserList();
    };
    return {
      user,
      userList,
      columns,
      pager,
      getUserList,
      handleQuery,
      handleReset,
      handleCurrentChange,
    };
  },
};
</script>

<style lang="scss">
</style>