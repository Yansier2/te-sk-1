<template>
  <goods-nav />
  <section v-loading="loading">
    <section class="w-full">
      <section>
        <swiper :modules="modules" :pagination="{ type: 'fraction' }">
          <swiper-slide v-for="(item, index) in detailData.imgsSrc" :key="item" @click="handlePreview(index)">
            <div class="zhengfangxing">
              <div class="zhengfangxing-child">
                <img class="Image" loading="lazy" :src="item" style="width: 100%; height: 100%; object-fit: cover" />
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </section>
    </section>
    <section @click="handleCopy" class="index_commodity_title">
      <div class="text-lg font-bold">
        {{ detailData.goodsName }}
      </div>
      <div class="price-box  py-2 text-lg font-bold">
        <!-- <span class="text-red-600">{{ detailData.sellingPrice }}</span> -->
        <span class="text-red-600">88 $</span>
        <span class="line-through text-gray-400 ml-2 text-base">{{ detailData.listPrice }} $</span>
      </div>
      <div ref="titleRef" class="title ellipsis-two word-break ellipsis-two" id="text-block-s" :data-clipboard-text="textstr2" @click="toggleExpanded">
        {{textstr1+textstr2 }}
      </div>
    </section>
    <section class="searchCode px-4 py-2 bg-white mt-2">
      <div class="pt-1.5 text-sm leading-5" style="color: #939399">
        search code <span style="color: #0a0a0a">{{ detailData.markCode }}</span>
      </div>
    </section>
    <shop />
    <recommend />
    <details-com :details="detailData" :textstr2s="textstr2"/>
  </section>
  <section class="bottom-btn py-1.5 px-4 fixed bottom-0 w-full bg-white z-50">
    <section class="h-9 rounded-3xl text-center text-sm flex items-center justify-center cursor-pointer"
      style="background: var(--el-color-success); color: #fff" @click="handleConsulting">
      <i class="wego-iconfont-s icon-kefu-shangjia"></i>
      <span class="ml-1">Consulting price</span>
    </section>
  </section>

  <el-drawer v-model="contact" direction="btt" :show-close="false" size="150px" :with-header="false"
    :close-on-press-escape="false" :close-on-click-modal="false">
    <connect-com :id="id" @close="contact = false" />
  </el-drawer>
</template>

<script setup>
import GoodsNav from '@/portal/views/goods/components/goodsNav.vue'
import Shop from './components/shop.vue'
import Recommend from '@/portal/views/goods/components/recommend.vue'
import DetailsCom from './components/details.vue'
import ConnectCom from '@/portal/views/store/components/connect.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'
import { getCurrentInstance, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { productDetail } from '@/portal/api/index.js'
import { useRouter } from 'vue-router'
import { linkpageget } from '@/admin/api/index.js'

const router = useRouter()
const modules = [Pagination]
const loading = ref(false)
const app = getCurrentInstance()
const contact = ref(false)
const id = ref('')
const titleRef = ref(null)
const textstr1 = ref('')
const textstr2 = ref('')
const textstrnumber = ref('')

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
    textstr2.value = phonelist.value[0].url
    
  })
}
const handleCopy = (ev) => {
  navigator.clipboard.writeText(ev.target.dataset.clipboardText).then(() => {
    ElMessage.info('Copied!')
  })
}
const handlePreview = (index) => {
  app.appContext.config.globalProperties.$hevueImgPreview({
    multiple: true,
    nowImgIndex: index,
    imgList: detailData.value.imgsSrc,
  })
}
const detailData = ref({})
const getDetails = async () => {
  id.value = router.currentRoute.value.params.id1
  if (!id.value) {
    return
  }
  productDetail(id.value)
    .then((res) => {
      
      detailData.value = res.data
      detailData.value.title = removeLinks(detailData.value.title)
      textstr1.value = detailData.value.title
    })
    .finally(() => {
      loading.value = false
    })
  fbq('track', 'AddToWishlist', { content_ids: id.value })
}
const handleConsulting = () => {
  if (id.value) {
    fbq('track', 'AddToCart', { content_ids: id.value })
  }
  contact.value = true
}
const toggleExpanded = () => {
  if (titleRef.value) {
    titleRef.value.classList.toggle('expanded')
  }
}
const removeLinks=(text) =>{
    // 正则表达式匹配 http 或 https 开头的链接
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = text.match(urlRegex);

    if (!matches) {
        return text;  // 没有匹配到链接，返回原字符串
    }

    // 遍历每个匹配到的链接，如果包含 http、https、whatsapp，则替换为空
    let newText = text;
    matches.forEach(link => {
        if (link.includes('http') || link.includes('https') || link.includes('whatsapp')) {
            newText = newText.replace(link, '');
        }
    });

    // 去掉多余空格
    return newText.trim();
}
onMounted(() => {
  loading.value = true
  fetchInitialData()
  getDetails()
})
</script>

<style lang="scss" scoped>
.ellipsis-two {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  text-align: left;
  -webkit-line-clamp: 2;
  cursor: pointer; /* 鼠标变成手型 */
}

.ellipsis-two.expanded {
  -webkit-line-clamp: unset;
  white-space: normal;
}
@media screen and (min-width: 1024px) {
  .bottom-btn {
    width: 670px;
  }
}

.image-box {
  height: 0;
  overflow: hidden;
  padding-bottom: 100%;
  width: 100%;
}

.index_commodity_title {
  background: #ffffff;
  padding: 4px 16px 16px;

  .title {
    color: #2e2e2f;
    font-size: 17px;
    font-weight: 500;
    line-height: 24px;
    margin-right: 16px;
  }
}

:deep(.swiper-pagination) {
  display: flex;
  justify-content: end;
  padding: 0 8px;
  background: rgba(0, 0, 0, 0.3);
  width: fit-content;
  border-radius: 24px;
  font-size: 12px;
  color: #fff;
  left: 100%;
  transform: translateX(calc(-100% - 16px));
  bottom: 16px;
}
</style>
