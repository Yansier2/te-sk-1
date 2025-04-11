<template>
  <div class="flex w-full justify-between mb-4 p-4">
    <div>
      <div class="f12 leading-4" style="color: #b7bec5">WhatsApp</div>
      <div class="mt-1 flex items-center">
        <div class="font-500 mr-1">85298417675</div>
        <el-icon @click="toCopy('toCopy')" class="cursor-pointer"><CopyDocument /></el-icon>
      </div>
    </div>
    <el-button class="mt-5" type="success" round @click="toWhatsApp">
      <i class="wego-iconfont-s icon-WhatsApp mr-1"></i>
      WhatsApp
    </el-button>
  </div>
  <div class="h-2" style="background: rgba(32, 47, 100, 0.03)"></div>
  <div class="w-full cursor-pointer p-4 text-center" @click="toEmit">Cancel</div>
</template>
<script setup>
import { CopyDocument } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
})
const emits = defineEmits(['close'])
const toEmit = () => {
  emits('close')
}

const toCopy = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    ElMessage.info('Copied')
  })
}
const toWhatsApp = () => {
  if (props.id) {
    fbq('track', 'Purchase', { content_ids: props.id, currency: 'USD', value: 30.0 })
    setTimeout(() => {
      toWhatsAppLink()
    }, 300)
  } else {
    toWhatsAppLink()
  }
}
const toWhatsAppLink = () => {
  const line = 'https://api.whatsapp.com/send?phone=85298417675&text='
  const wstext = `I want to know about this, the link is:${window.location.href}`
  location.href = line + encodeURIComponent(wstext)
}
</script>
