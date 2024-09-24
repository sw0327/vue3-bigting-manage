<script setup>
import { ref } from 'vue'

import ChannelSelect from './components/ChannelSelect.vue'
import { formatTime } from '@/utils/format'
import { delArtical, getArticleList } from '@/api/article'
import ArticalEdit from './components/ArticalEdit.vue'
import { Delete } from '@element-plus/icons-vue'
import { Edit } from '@element-plus/icons-vue'

const articleList = ref([])
const total = ref(0)
const loading = ref(false)
const articalEditForm = ref()

const params = ref({
  pagenum: 1,
  pagesize: 2,
  cate_id: '', ///文章分类
  state: '' ///发布状态
})

///渲染文章列表
const getaritcalList = async () => {
  loading.value = true
  const res = await getArticleList(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getaritcalList()

const toSearch = () => {
  params.value.pagenum = 1
  getaritcalList()
}
const toReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getaritcalList()
}
const handleSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getaritcalList()
}
const handleCurrentChange = (page) => {
  params.value.pagenum = page
  getaritcalList()
}
const addArtical = () => {
  articalEditForm.value.open({})
}
const editArtical = (row) => {
  articalEditForm.value.open(row)
}
// 编辑成功或添加成功更新当前页码
const onSuccess = (data) => {
  if (data === 1) {
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getaritcalList()
}
// 删除文章
const delateArtical = async (row) => {
  await delArtical(row.id)
  getaritcalList()
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="addArtical">发布文章</el-button>
    </template>

    <el-form inline>
      <el-form-item label="文章分类:" style="width: 200px">
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态:" style="width: 200px">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="toSearch">搜索</el-button>
        <el-button @click="toReset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="articleList" v-loading="loading">
      <el-table-column prop="title" label="文章标题" width="400">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="cate_name" label="分类"></el-table-column>
      <el-table-column prop="pub_date" label="发表时间">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            type="primary"
            circle
            plain
            :icon="Edit"
            @click="editArtical(row)"
          ></el-button>
          <el-button
            type="danger"
            circle
            plain
            :icon="Delete"
            @click="delateArtical(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 5, 8]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />

    <artical-edit ref="articalEditForm" @success="onSuccess"></artical-edit>
  </page-container>
</template>
