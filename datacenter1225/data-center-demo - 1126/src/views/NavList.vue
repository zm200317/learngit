<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        width="120">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="120">
      </el-table-column>
      <el-table-column
        prop="department"
        label="部门"
        width="150">
      </el-table-column>
      <el-table-column
        prop="floor"
        label="楼层"
        width="120">
      </el-table-column>
      <el-table-column
        prop="area"
        label="区域"
        width="120">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center;margin-top: 30px;">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="current_change">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavList'
}
</script>

<style scoped>

</style>
