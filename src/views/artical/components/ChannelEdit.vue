<script setup>
import { addArticalService, updateArticleService } from '@/api/article'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { defineEmits } from 'vue'

const dialogVisible = ref(false)
const form = ref()
const ruleForm = ref({
  id: '',
  cate_name: '',
  cate_alias: ''
})

const emit = defineEmits(['success'])

const rules = ref({
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    { pattern: /^\S{1,10}$/, message: '请输入1-10位非空字符', trigger: 'blur' }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    { pattern: /^\S{1,10}$/, message: '请输入1-10位非空字符', trigger: 'blur' }
  ]
})

const open = (row) => {
  ruleForm.value = { ...row } ///注意深浅拷贝
  dialogVisible.value = true
}

const submit = async () => {
  await form.value.validate()
  if (!ruleForm.value.id) {
    await addArticalService(ruleForm.value)
    ElMessage({
      message: '添加成功',
      type: 'success'
    })
  } else {
    await updateArticleService(ruleForm.value)
    ElMessage({
      message: '修改成功',
      type: 'success'
    })
  }
  dialogVisible.value = false
  emit('success')
}

defineExpose({ open })
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="ruleForm.id ? '编辑分类' : '添加分类'"
    width="450"
  >
    <el-form
      :model="ruleForm"
      ref="form"
      :rules="rules"
      label-width="auto"
      style="padding: 0 30px"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="ruleForm.cate_name" />
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="ruleForm.cate_alias" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<!-- <script setup>
import {ref} from 'vue'
const dialogVisible=ref(false)

const open = (res)=>{
  console.log(res)
  dialogVisible.value=true
}


defineExpose({open})
</script>


<template>
  <el-dialog v-model="dialogVisible" title="添加分类" width="500">
    <span>内容</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template> -->
