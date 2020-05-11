<template>
  <div class="container_write" v-loading.fullscreen="loading">
    <div class="main">
      <div class="article-form">
        <div class="title">
          <el-input
            v-model="articleForm.title"
            placeholder="请输入标题..."
            size="large"
          ></el-input>
        </div>
        <div class="label">
          <template v-if="articleForm.tags.length > 0">
            <el-tag
              v-for="tag in articleForm.tags"
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
        <div class="button_list">
          <div class="label_select">
            <el-popover
              title="标签选择"
              placement="left-start"
              width="300"
              trigger="hover"
            >
              <div class="label_content">
                <el-tag
                  v-for="(tag, index) in tagList"
                  :key="index"
                  @click="handleChange(tag)"
                  >{{ tag }}</el-tag
                >
              </div>
              <el-button slot="reference">标签选择</el-button>
            </el-popover>
          </div>
          <div class="button_right">
            <el-button size="medium" type="primary" @click="saveDraft"
              >保存草稿</el-button
            >
            <el-button size="medium" type="success" @click="publish"
              >发布文章</el-button
            >
          </div>
        </div>
        <div class="editor">
          <mavon-editor
            ref="md"
            v-model="articleForm.content"
            @imgAdd="$imgAdd"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { imgUpload } from '@/api/article.js'
export default {
  name: '',
  components: {
    mavonEditor
  },
  props: [''],
  data() {
    return {
      articleForm: {
        title: '',
        tags: [],
        content: ''
      },
      rules: {
        title: [{ required: true, message: '请输入文章标题' }],
        tags: [{ required: true, message: '请选择标签' }],
        content: [
          { required: true, message: '请输入文章内容' },
          { min: 5, message: '文章内容最少 5 个字符' }
        ]
      },
      tagList: ['前端', '后端', '爱好', '笔记'],
      loading: false
    }
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    // 删除标签(参数来自组件内部的emit)
    handleChange(tag) {
      if (!this.articleForm.tags.includes(tag)) {
        this.articleForm.tags.push(tag)
      } else {
        const index = this.articleForm.tags.indexOf(tag)
        this.articleForm.tags.splice(index, 1)
      }
    },
    handleClose(tag) {
      this.articleForm.tags.splice(this.articleForm.tags.indexOf(tag), 1)
    },
    saveDraft() {},
    publish() {
      this.validate()
        .then(_v => {
          //进行提交确认操作
          this.$confirm('确认要发布文章?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          })
            .then(() => {
              //点击完确认之后向后台发出请求
              this.loading = true
              this.$store
                .dispatch('article/createArticle', this.articleForm)
                .then(data => {
                  this.loading = false
                  this.$notify({
                    title: '成功',
                    message: '创建文章成功',
                    type: 'success'
                  })
                  this.$router.push('/article/list')
                })
                .catch(error => {
                  console.log('shibai')
                })
            })
            .catch(() => {})
        })
        .catch(_v => {
          console.log(_v)
        })
    },
    validate() {
      return new Promise((resolve, reject) => {
        let hasError = false
        for (let key in this.articleForm) {
          for (let rule of this.rules[key]) {
            //内部自定义规则都在此遍历
            //对于required规则的判断
            if (
              rule.required && this.articleForm[key] instanceof Array
                ? this.articleForm[key].length === 0
                : !this.articleForm[key]
            ) {
              this.$message.error(rule.message)
              hasError = true
              break
            }
            //对于文章最少字符的判断
            if (rule.min) {
              if (this.articleForm.content.length < rule.min) {
                this.$message.error(rule.message)
                hasError = true
                break
              }
            }
          }
          if (hasError) {
            reject(hasError)
            break
          }
        }
        hasError ? '' : resolve(hasError)
      })
    },
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      console.log($file)
      let formData = new FormData()
      formData.append('file', $file)
      imgUpload(formData, { 'Content-Type': 'multipart/form-data' }).then(
        res => {
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          /**
           * $vm 指为mavonEditor实例，可以通过如下两种方式获取
           * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
           * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
           */
          this.$refs.md.$img2Url(pos, res.url)
        }
      )
    }
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
@media screen and (min-width: 1200px) {
  .article-form {
    width: 1200px;
    margin: auto;
  }
}

.ivu-tag {
  cursor: pointer;
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
.button_list {
  display: flex;
  justify-content: space-between;
}
</style>
