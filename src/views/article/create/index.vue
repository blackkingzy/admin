<template>
  <div class="container_write">
    <div class="main">
      <div class="article-form">
        <div class="title">
          <el-input
            v-model="title"
            placeholder="请输入标题..."
            size="large"
          ></el-input>
        </div>
        <div class="label">
          <template v-if="selectedTags.length > 0">
            <el-tag
              v-for="tag in selectedTags"
              :key="tag"
              closable
              @close="handleClose(tag)"
              >{{ tag }}</el-tag
            >
          </template>
          <template v-else>
            <span>请务必选择标签</span>
          </template>
        </div>
        <div class="label_select">
          <el-popover
            title="标签选择"
            placement="left-start"
            width="300"
            trigger="hover"
          >
            <div class="label_content">
              <el-tag
                v-for="(tag, index) in tags"
                :key="index"
                @click="handleChange(tag)"
                >{{ tag }}</el-tag
              >
            </div>
            <el-button slot="reference">标签选择</el-button>
          </el-popover>
        </div>
        <div class="editor">
          <mavon-editor v-model="value" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: '',
  components: {
    mavonEditor
  },
  props: [''],
  data() {
    return {
      title: '',
      value: 'zzzzzzzzzzzzzzzzzzz',
      tags: ['前端', '后端', '爱好', '笔记'],
      selectedTags: []
    }
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    // 删除标签(参数来自组件内部的emit)
    handleChange(tag) {
      if (!this.selectedTags.includes(tag)) {
        this.selectedTags.push(tag)
      } else {
        const index = this.selectedTags.indexOf(tag)
        this.selectedTags.splice(index, 1)
      }
    },
    handleClose(tag) {
      this.selectedTags.splice(this.selectedTags.indexOf(tag), 1)
    }
  },

  watch: {}
}
</script>
<style lang="scss" scoped>
.article-form {
  width: 1200px;
  margin: auto;
  .ivu-tag {
    cursor: pointer;
  }
}
.title {
  padding: 10px 0px;
}
.label {
  height: 30px;
  margin-bottom: 5px;
  .el-tag {
    margin-right: 3px;
  }
}
.label_content {
  white-space: normal;
  .el-tag {
    cursor: pointer;
    margin-right: 2px;
  }
}
.label_select {
  margin-bottom: 10px;
}
</style>
