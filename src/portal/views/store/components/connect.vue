<template>
  <div v-for="(item, index) in phonelist" :key="index" class="flex w-full justify-between mb-4 p-4">
    <div class="text-lg leading-4" style="color: #7bbec5">WhatsApp</div>
    <div class="mt-1 flex items-center">
      <div class="font-500 mr-1">{{ item.non }}</div>
      <el-icon @click="copyToClip(item.non)" class="cursor-pointer">
        <CopyDocument />
      </el-icon>
    </div>
    <el-button class="mt-5" type="success" round @click="toWhatsApp(item.url)">
      <i class="wego-iconfont-s icon-WhatsApp mr-1"></i>
      WhatsApp
    </el-button>
  </div>
  <div class="h-2" style="background: rgba(32, 47, 100, 0.03)"></div>
  <div class="w-full cursor-pointer p-4 text-center" @click="toEmit">Cancel</div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { CopyDocument } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { linkpageget } from '@/admin/api/index.js'

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


const copyToClip = (text) => {
  navigator.clipboard.writeText(text)
  ElMessage.success('复制成功')
}

const toWhatsApp = (link) => {
  if (link) {
    fbq('track', 'Purchase', { content_ids: props.id, currency: 'USD', value: 30.0 })
    window.open(link, '_blank')
  } else {
    toWhatsAppLink()
  }
}

const toWhatsAppLink = () => {
  const line = 'https://api.whatsapp.com/send?phone=85298417675&text='
  const wstext = `I want to know about this, the link is:${window.location.href}`
  location.href = line + encodeURIComponent(wstext)
}
let phonelist = ref([])
const fetchInitialData = async () => {
  linkpageget().then((res) => {
    let reviceinputs = []
    reviceinputs = JSON.parse(res.data)
    phonelist.value = reviceinputs.map(url => {
      let phone = null

      if (url.includes('api.whatsapp.com')) {
        const match = url.match(/phone=(\d+)/)
        phone = match ? match[1] : url
      } else if (url.includes('wa.me')) {
        const match = url.match(/wa\.me\/(\d+)/)
        phone = match ? match[1] : url
      } else {
        phone = url // 不符合条件的，non 就是原始值
      }

      return { url, non: phone }
    })
    console.log(phonelist.value, 'phonelist.value');

  })
}
onMounted(() => {
  fetchInitialData()
})
</script>
