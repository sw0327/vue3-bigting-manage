<script setup>
import { ref } from 'vue'
import { deleteArticleService, getAritcalChannel } from '@/api/article'
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'

const articalManageList = ref([])
const loading = ref(false)
const dialog = ref()

const getList = async () => {
  loading.value = true
  articalManageList.value = (await getAritcalChannel()).data.data
  loading.value = false
}
getList()

const submitEdit = ({ row }) => {
  dialog.value.open(row)
}
const addChannel = () => {
  dialog.value.open({})
}
const successEdit = () => {
  getList()
}
const deleteArticle = async ({ row }) => {
  await ElMessageBox.confirm('您确认要删除吗？', '温馨提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
  await deleteArticleService(row.id)
  ElMessage.success('删除成功')
  getList()
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="addChannel">添加分类</el-button>
    </template>
    <el-table :data="articalManageList" v-loading="loading">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="obj">
          <el-button
            type="primary"
            :icon="Edit"
            circle
            plain
            @click="submitEdit(obj)"
          />
          <el-button
            type="danger"
            :icon="Delete"
            circle
            plain
            @click="deleteArticle(obj)"
          />
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="这里空空如也~~~" />
      </template>
    </el-table>

    <channel-edit ref="dialog" @success="successEdit"></channel-edit>
  </page-container>
</template>
