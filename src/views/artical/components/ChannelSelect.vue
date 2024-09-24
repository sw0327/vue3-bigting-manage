<script setup>
import { getAritcalChannel } from '@/api/article'
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: [Number, String]
  }
})

const channelList = ref({})
const getchannelList = async () => {
  const res = await getAritcalChannel()
  channelList.value = res.data.data
}
getchannelList()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <!-- 子组件接受父组件传递过来的值，当改变其选中的值时，向父组件触发update:modelValue事件，将更新的值传过去 -->
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <el-option
      :label="channel.cate_name"
      :value="channel.id"
      v-for="channel in channelList"
      :key="channel.id"
    ></el-option>
  </el-select>
</template>
