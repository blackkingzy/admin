<template>
  <div class="container">
    <div class="filter-container"></div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="ID" prop="id"> </el-table-column>
      <el-table-column label="Date" prop="date" sortable> </el-table-column>
      <el-table-column label="Title" prop="title"> </el-table-column>
      <el-table-column label="Author" prop="author"> </el-table-column>
      <el-table-column label="Label" prop="label">
        <template v-slot:default="scope">
          <span>{{ scope.row.label }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Readings" prop="readings"> </el-table-column>
      <el-table-column label="Status" prop="status"> </el-table-column>
      <el-table-column label="Action" align="center" min-width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          title: 'ES6教学',
          author: '张越',
          label: '前端',
          readings: '100',
          status: 'draft'
        },
        {
          id: 2,
          date: '2016-05-04',
          title: 'http学习',
          author: '王铮',
          label: ['http', '前端'],
          readings: '500',
          status: 'published'
        },
        {
          id: 3,
          date: '2016-05-06',
          title: 'mysql部署',
          author: '张越',
          label: '后端',
          readings: '100',
          status: 'draft'
        },
        {
          id: 4,
          date: '2016-05-02',
          title: 'node学习',
          author: '张越',
          label: 'node',
          readings: '100',
          status: 'published'
        }
      ],
      search: ''
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding: 20px;
}
</style>
