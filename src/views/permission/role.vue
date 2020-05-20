<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">New Role</el-button>

    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="Role Key" width="220">
        <template slot-scope="scope">
          {{ scope.row.key }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Role Name" width="220">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="Description">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operations">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)"
            >Edit</el-button
          >
          <el-button type="danger" size="small" @click="handleDelete(scope)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import AddRole from './components/AddRole'
import { deepClone } from '@/utils'
import {
  getRoutes
  // getRoles,
  // deleteRole,
} from '@/api/role'
export default {
  data() {
    return {
      rolesList: [
        {
          key: 1,
          name: 'zhangyue',
          description: 'admin',
          routes: [
            {
              path: '/',
              redirect: '/dashboard',
              children: [
                {
                  path: 'dashboard',
                  name: 'Dashboard',
                  meta: { title: 'Dashboard', icon: 'dashboard' }
                }
              ]
            },

            {
              path: '/example',
              redirect: '/example/table',
              name: 'Example',
              meta: { title: 'Example', icon: 'example' },
              children: [
                {
                  path: 'table',
                  name: 'Table',
                  meta: { title: 'Table', icon: 'table' }
                },
                {
                  path: 'tree',
                  name: 'Tree',
                  meta: { title: 'Tree', icon: 'tree' }
                }
              ]
            }
          ]
        },
        {
          key: 2,
          name: 'wangzhen',
          description: 'visitor',
          routes: [
            {
              path: '/nested',
              redirect: '/nested/menu1/menu1-1',
              name: 'Nested',
              meta: {
                title: 'Nested',
                icon: 'nested'
              },
              children: [
                {
                  path: 'menu1',
                  name: 'Menu1',
                  redirect: 'noRedirect', //面包屑置灰，不可点击
                  meta: { title: 'Menu1' },
                  children: [
                    {
                      path: 'menu1-3',
                      name: 'Menu1-3',
                      meta: { title: 'Menu1-3' }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  computed: {},
  created() {},
  methods: {
    // async getRoles() {
    //   const res = await getRoles()
    //   this.rolesList = res.data
    // }
    // Reshape the routes structure so that it looks the same as the sidebar

    handleAddRole() {
      this.$create(AddRole).open()
    },
    handleEdit(scope) {
      this.$create(AddRole, {
        dialogType: 'edit',
        editedRole: deepClone(scope.row)
      }).open()
    },
    handleDelete({ $index, row }) {
      this.$confirm(
        'Are you sure you want to delete this role?',
        'Confirm delete',
        {
          confirmButtonText: 'confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      ).then(() => {
        console.log('就是要删除你')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
