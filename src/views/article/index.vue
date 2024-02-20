<template>
  <div class="article-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>数据后台</el-breadcrumb-item>
      <el-breadcrumb-item>数据管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="never" border="false">
      <template #header>
        <div class="header">
          <span>共 {{total}}条记录</span>
          <el-button
            icon="el-icon-plus"
            size="small"
            type="primary"
            round
           @click="openDwan('add')"
            >

            添加数据
          </el-button>
        </div>
      </template>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="stem" label="标题" width="400">
          </el-table-column>
          <el-table-column prop="creator" label="作者"> </el-table-column>
          <el-table-column prop="likeCount" label="点赞"> </el-table-column>
          <el-table-column prop="views" label="浏览数"> </el-table-column>
          <el-table-column prop="createdAt" label="更新时间" width="200">
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template #default="{ row }">
              <div class="actions">
                <i class="el-icon-view" @click="openDwan('look',row.id)"></i>
                <i class="el-icon-edit-outline" @click="openDwan('edit',row.id)"></i>
                <i class="el-icon-delete" @click="del(row.id)"></i>
              </div>
            </template>
        </el-table-column>
      </el-table>
        <el-pagination
          background
          layout="sizes,prev, pager, next"
          :total="total"
          :current-page="params.current"
          @current-change="currentData"
          @size-change="SizeChange"
          :page-sizes="[10,20,30,50,100]"

          >
        </el-pagination>
    </el-card>
    <!-- 抽屉 -->
    <el-drawer
      :title="title"
      :visible.sync="drawer"
      direction="rtl"
      :before-close="handleClose">
      <div v-if="nowtitle === 'look'" class="article-preview">
        <h5>{{ ruleForm.stem }}</h5>
        <div v-html="ruleForm.content"></div>
      </div>
      <el-form v-else ref="form" label-width="80px" :model="ruleForm" :rules="rules" >
        <el-form-item label="标题" prop="stem">
          <el-input placeholder="输入面经标题"   v-model="ruleForm.stem"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content"> <quillEditor v-model="ruleForm.content" @blur="$refs.form.validateField('content')"></quillEditor> </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">确认</el-button>
          <el-button @click='drawer=false'>取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { getArticleList, createArticle, deleteArticle, getInter, updateArticle } from '@/api/article'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'article-page',
  data () {
    return {
      total: null,
      drawer: false,
      title: '',
      nowtitle: '',
      params: {
        current: 1,
        pageSize: 10
      },
      tableData: [],
      ruleForm: {
        id: '',
        stem: '',
        content: ''
      },
      rules: {
        stem: [
          { required: true, message: '请输入面经标题', trigger: 'blur' },
          { min: 0, max: 100, message: '长度在 0 到 100 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入面经内容', trigger: 'blur' },
          { min: 3, max: 200, message: '长度在 3 到 200 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getdata()
  },
  methods: {
    async getdata () {
      const res = await getArticleList(this.params)
      this.tableData = res.data.rows
      this.total = res.data.total
      // this.id=
    },
    async del (id) {
      await deleteArticle(id)
      this.$message.success('删除成功')
      this.getdata()
    },
    currentData (page) {
      this.params.current = page
      this.getdata()
    },
    SizeChange (page) {
      this.params.pageSize = page
      this.getdata()
    },
    async openDwan (type, id) {
      this.drawer = true
      const obj = {
        add: '添加数据',
        look: '查看数据',
        edit: '编辑数据'
      }
      this.ruleForm.id = id
      this.nowtitle = type
      this.title = obj[type]
      if (type === 'edit' || type === 'look') {
        const res = await getInter(id)
        this.ruleForm.stem = res.data.stem
        this.ruleForm.content = res.data.content
      } else if (type === 'add') {
        this.ruleForm.stem = ''
        this.ruleForm.content = ''
      }
    },
    handleClose (done) {
      if (this.type === 'add' || this.type === 'edit') {
        this.$refs.form.resetFields()
      }
      done()
    },
    async submit () {
      await this.$refs.form.validate()
      // 整个表单校验-发起请求-关闭抽屉-更新页面
      if (this.nowtitle === 'add') {
        await createArticle(this.ruleForm)
        this.$refs.form.resetFields()
        this.$message.success('添加成功')
        this.drawer = false
        this.params.current = 1
        this.getdata()
      }
      if (this.nowtitle === 'edit') {
        await updateArticle(this.ruleForm)
        this.$refs.form.resetFields()
        this.$message.success('修改成功')
        this.drawer = false
        this.params.current = 1
        this.getdata()
      }
    }
  },
  components: {
    quillEditor
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 25px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;
  }
  .actions {
    font-size: 18px;
    display: flex;
    justify-content: space-around;
    color: #666;
    > i:hover {
      color: rgba(114, 124, 245, 1);
      cursor: pointer;
    }
  }
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
.el-breadcrumb {
  margin-top: 10px;
}
.el-form {
  padding-right: 40px;
}
.quill-editor {
  ::v-deep .ql-editor {
    height: 300px;
  }
}
.el-rate {
  padding: 10px 0;
}
.article-preview {
  padding: 0 40px 40px 40px;
  > h5 {
    font-size: 20px;
    color: #666;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 30px;
    margin: 0 0 20px 0;
  }
}
</style>
