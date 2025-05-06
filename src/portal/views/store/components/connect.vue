<template>
  <div class="popup-overlay" @click.self="toEmit">
    <transition name="popup">
      <div class="popup-container">
        <div v-for="(item, index) in phonelist" :key="index" class="phone-item">
          <div class="label">WhatsApp</div>
          <div class="phone-info">
            <div class="phone-number">{{ item.non }}</div>
            <el-icon @click="copyToClip(item.non)" class="icon-copy">
              <CopyDocument />
            </el-icon>
          </div>
          <el-button class="whatsapp-button" type="success" round @click="toWhatsApp(item.url)">
            <i class="wego-iconfont-s icon-WhatsApp"></i>
            WhatsApp
          </el-button>
        </div>
        <div class="separator"></div>
        <div class="cancel-button" @click="toEmit">Cancel</div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-container {
  width: 100%;
  max-height: 80vh; /* 最大高度为视口80% */
  overflow-y: auto; /* 超出部分滚动 */
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
}

.phone-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 16px;
  padding: 12px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.label {
  font-size: 16px;
  font-weight: bold;
  color: #7bbec5;
  margin-bottom: 8px;
}

.phone-info {
  display: flex;
  align-items: center;
  word-break: break-all;
  margin-bottom: 8px;
  width: 100%;
}

.phone-number {
  font-weight: 500;
  margin-right: 8px;
  flex: 1;
}

.icon-copy {
  cursor: pointer;
}

.whatsapp-button {
  width: 100%;
}

.separator {
  height: 8px;
  background: rgba(32, 47, 100, 0.03);
  margin: 16px 0;
}

.cancel-button {
  width: 100%;
  text-align: center;
  padding: 12px;
  cursor: pointer;
  color: #333;
  font-size: 16px;
  border-top: 1px solid #ddd;
}

/* 动画效果 */
.popup-enter-active, .popup-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.popup-enter-from, .popup-leave-to {
  transform: scale(0.9);
  opacity: 0;
}
</style>

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
    let finallink = extractPlainPhoneNumbers(link)[0]
    finallink = "https://api.whatsapp.com/send?phone="+finallink+"&text="
    const wstext = `I want to know about this, the link is:${window.location.href}`
    location.href = finallink + encodeURIComponent(wstext)
    // window.open(finallink, '_blank')
  } else {
    toWhatsAppLink()
  }
}
function extractPlainPhoneNumbers(str) {
    const regex = /\b\d{6,}\b/g;
    const matches = str.match(regex);
    return matches ? matches : [];
}
const toWhatsAppLink = () => {
  const line = 'https://api.whatsapp.com/send?phone=85255949154&text='
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
        phone = url
      }

      return { url, non: phone }
    })
    console.log(phonelist.value, 'phonelist.value')
  })
}

onMounted(() => {
  fetchInitialData()
})
</script>
