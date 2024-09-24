<script setup>
import { addArtical, getArticle, updateArtical } from '@/api/article'
import { ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { nextTick } from 'vue'
import axios from 'axios'
import { Plus } from '@element-plus/icons-vue'

const baseURL = 'http://big-event-vue-api-t.itheima.net'
const drawer = ref(false)
const contentRef = ref()
const form = ref()

const params2 = ref({
  title: '',
  cate_id: '',
  content: '',
  cover_img: '',
  state: ''
})
const rules = ref({
  title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
  cate_id: [{ required: true, message: '文章分类不能为空', trigger: 'blur' }],
  cover_img: [{ required: true, message: '请上传封面', trigger: 'blur' }],
  content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }]
})
const imgUrl = ref('')
const emit = defineEmits(['success'])

const open = async (row) => {
  drawer.value = true
  if (row.id) {
    // 编辑文章
    const res = await getArticle(row.id) //获取文章详情
    params2.value = res.data.data
    imgUrl.value = baseURL + params2.value.cover_img
  } else {
    // 添加文章
    imgUrl.value = ''
    params2.value = {
      title: '',
      cate_id: '',
      content: '',
      cover_img: '',
      state: ''
    }
    await nextTick()
    contentRef.value.setHTML('')
  }
}
defineExpose({ open })

// 上传文件
const changeImg = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  params2.value.cover_img = uploadFile.raw
}
// 点击发布按钮
const onPublic = async (state) => {
  if (form.value.validate()) {
    drawer.value = false
    params2.value.state = state
    const file = await urlToFileWithAxios(imgUrl.value, params2.value.cover_img)
    params2.value.cover_img = file
    const fd = new FormData()
    for (let key in params2.value) {
      fd.append(key, params2.value[key])
    }
    if (params2.value.id) {
      // 发送编辑请求
      await updateArtical(fd)
      emit('success', 0)
    } else {
      // 发送添加请求
      await addArtical(fd)
      emit('success', 1)
    }
  }
}
// 将url图片转化为file文件
async function urlToFileWithAxios(url, fileName) {
  try {
    // 使用 axios 发送 GET 请求，并将响应类型设置为 'blob'
    const response = await axios.get(url, { responseType: 'blob' })

    // 将 blob 数据转换为 File 对象
    const file = new File([response.data], fileName, {
      type: response.data.type
    })

    return file
  } catch (error) {
    console.error('Error fetching the image', error)
    throw error // 抛出错误，以便在调用时可以捕获
  }
}
</script>
<template>
  <el-drawer
    v-model="drawer"
    :title="params2.id ? '编辑文章' : '添加文章'"
    size="50%"
  >
    <el-form ref="form" :rules="rules" :model="params2">
      <el-form-item label="文章标题" prop="title">
        <el-input placeholder="请输入标题" v-model="params2.title"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <!-- 父组件通过v-model传值过去，并监听子组件的update:modelValue事件 -->
        <channel-select v-model="params2.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="changeImg"
          v-model="params2.cover_img"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor
            theme="snow"
            v-model:content="params2.content"
            content-type="html"
            ref="contentRef"
          ></quill-editor>
        </div>
      </el-form-item>
      <el-form-item style="margin-left: 78px">
        <el-button type="primary" @click="onPublic('已发布')">发布</el-button>
        <el-button type="info" @click="onPublic('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<style scoped lang="scss">
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
