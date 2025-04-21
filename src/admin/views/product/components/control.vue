<template>
    <div class="visual-form-page">
        <div class="form-actions">
            <el-button type="primary" @click="submitForm">确认修改</el-button>
        </div>
        <el-card shadow="hover" class="card" v-for="(section, sectionIndex) in formData" :key="sectionIndex"
            :loading="loading">
            <div class="section-header">
                <el-input v-model="section.wrapper_title" placeholder="Section Title" />
                <el-button type="primary" @click="addItem(sectionIndex)">增加二级条目</el-button>
                <el-button type="danger" @click="removeSection(sectionIndex)">移除一级区块</el-button>
            </div>

            <div class="item-list-grid">
                <el-card class="item-card" shadow="never" v-for="(item, itemIndex) in section.item_list"
                    :key="itemIndex">
                    <div class="item-pic-container">
                        <img v-if="item.item_pic" :src="item.item_pic" class="item-pic" />
                    </div>
                    <el-select v-model="item.item_pic" placeholder="图片路径" clearable>
                        <el-option v-for="option in options.item_pic" :key="option" :label="option" :value="option" />
                    </el-select>

                    <el-select v-model="item.displayName" placeholder="主标题" clearable>
                        <el-option v-for="option in options.displayName" :key="option" :label="option"
                            :value="option" />
                    </el-select>
                    <el-select v-model="item.displayName2nd" placeholder="副标题" clearable>
                        <el-option v-for="option in options.displayName2nd" :key="option" :label="option"
                            :value="option" />
                    </el-select>
                    <el-select v-model="item.eventName" placeholder="事件名称" clearable>
                        <el-option v-for="option in options.eventName" :key="option" :label="option" :value="option" />
                    </el-select>
                    <el-select v-model="item.contentCategory" placeholder="控制参数" clearable>
                        <el-option v-for="option in options.contentCategory" :key="option" :label="option"
                            :value="option" />
                    </el-select>

                    <div class="target-url-row">
                        <el-select v-model="item.targetUrl" placeholder="跳转链接" clearable>
                            <el-option v-for="option in options.targetUrl" :key="option" :label="option"
                                :value="option" />
                        </el-select>
                        <span class="url-note">{{ targetUrlNotes[item.targetUrl] || '无备注' }}</span>
                    </div>

                    <el-select v-model="item.arrow_svg" placeholder="图标" clearable>
                        <el-option v-for="option in options.arrow_svg" :key="option" :label="option" :value="option" />
                    </el-select>

                    <el-button type="danger" @click="removeItem(sectionIndex, itemIndex)">移除条目</el-button>
                </el-card>
            </div>
        </el-card>

        <div class="add-section">
            <el-button type="success" @click="addSection">增加一级条目</el-button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { updateByKey, homePage } from '@/admin/api/index.js'
// import {products} from '../../../../../public/js/products.js'

const formData = ref([])
const loading = ref(false)

onMounted(async () => {
    loading.value = true

    homePage().then((res) => {
        formData.value = JSON.parse(res.data)
        loading.value = false
    })

})
// onMounted(async () => {
// 恢复初始文件
//     loading.value = true
//     const res = products
//     formData.value = res || []
//     loading.value = false
// })
const submitForm = async () => {
    updateByKey(JSON.stringify(formData.value)).then(() => {
        ElMessage.success('修改已提交')
    })
}
const options = {
    item_pic: [
        './img/678f556a2144e3_85480981.jpg',
        './img/678a01d09baaf3_19225278.jpg',
        './img/6789fbde22f7d6_48859685.jpg',
        './img/6789fb5df271b7_14612256.jpg',
        './img/6789fb5e33f666_91503493.jpg',
        './img/6789fb5e84e0b9_51959165.jpg',
        './img/6789fb5ed0a8c0_49104624.jpg',
        './img/6789fb5f5779b8_72805395.jpg',
        './img/6789fee69da512_83378834.jpg',
        './img/678a006692c897_73459393.jpg',
        './img/678a0066e10389_56776739.jpg',
        './img/678a00671fc152_58377411.jpg',
        './img/678a006750b834_10908049.jpg',
        './img/678a006786f0d5_34008816.jpg',
        './img/678a0067bb3dd2_68184457.jpg',
        './img/678c5c42d273f7_58365054.jpg',
        './img/678c5c433a72f3_87581624.jpg'
    ],
    displayName: [
        "Get to know more about us",
        "Contact us to know more",
        "Louis Vuitton 👜",
        "Chanel 🧸",
        "Gucci 👜",
        "DIOR 🎀",
        "Fendi 🎒",
        "Hermes and more 👝",
        "High-heeled shoes 👠",
        "Rolex ⚜️",
        "Patek Philippe 👑",
        "LONGINES 🧭",
        "CARTIER 💎",
        "BREITLING ⚔️",
        "BLANCPAIN ⏱",
        "Clothings",
        "Various brands of jewelries,sunglasses and more"
    ],
    displayName2nd: [
        "Start a conversation",
        "the classics remain unchanged",
        "Ms. Fashion",
        "Timeless Glamour",
        "Elegant Charm",
        "Charm from Rome",
        "Top brands",
        "Send us your favorite pictures to check the price",
        "Shirts,Dress,Jeans and more"
    ],
    eventName: ["Schedule"],
    contentCategory: [
        "Get to know more about us",
        "Start a conversation",
        "Louis Vuitton",
        "Chanel",
        "Gucci",
        "Dior",
        "Fendi",
        "Hermes",
        "High-heeled shoes",
        "Rolex",
        "Patek Philippe",
        "Longines",
        "Cartier",
        "Breitling",
        "Blancpain",
        "Clothings",
        "Jewelries"
    ],
    targetUrl: [
        "/#/goodList/75922607",
        "https://api.whatsapp.com/send?phone=85298417675&text=Contact me - start a conversation ↑ ↑ ↑",
        "/#/goodList/58812753",
        "/#/goodList/58812747",
        "/#/goodList/58812774",
        "/#/goodList/58815865",
        "/#/goodList/58812785",
        "/#/goodList/58812762",
        "/#/goodList/75904356",
        "/#/goodList/58792442",
        "/#/goodList/58812024",
        "/#/goodList/58812080",
        "/#/goodList/58811952",
        "/#/goodList/58811827",
        "/#/goodList/58811966",
        "/#/goodList/72142451",
        "/#/goodList/75970900"
    ],
    arrow_svg: ["./img/link-button-arrow.svg"]
}

const targetUrlNotes = {
    "/#/goodList/75922607": "Social Media 主打商品页面",
    "https://api.whatsapp.com/send?phone=85298417675&text=Contact me - start a conversation ↑ ↑ ↑": "WhatsApp 联系跳转",
    "/#/goodList/58812753": "LV 商品集合",
    "/#/goodList/58812747": "Chanel 精品推荐",
    "/#/goodList/58812774": "Gucci 系列",
    "/#/goodList/58815865": "DIOR 热销款",
    "/#/goodList/58812785": "Fendi 推荐",
    "/#/goodList/58812762": "Hermes 精品",
    "/#/goodList/75904356": "鞋子系列",
    "/#/goodList/58792442": "Rolex 精选",
    "/#/goodList/58812024": "Patek Philippe 高端表",
    "/#/goodList/58812080": "LONGINES 时尚表",
    "/#/goodList/58811952": "CARTIER 精品",
    "/#/goodList/58811827": "BREITLING 手表",
    "/#/goodList/58811966": "BLANCPAIN 精选",
    "/#/goodList/72142451": "服装混搭推荐",
    "/#/goodList/75970900": "饰品眼镜集合"
}

const addSection = () => {
    formData.value.push({
        wrapper_title: '',
        item_list: []
    })
}

const removeSection = (index) => {
    formData.value.splice(index, 1)
}

const addItem = (sectionIndex) => {
    formData.value[sectionIndex].item_list.push({
        item_pic: '',
        displayName: '',
        displayName2nd: '',
        eventName: '',
        contentCategory: '',
        targetUrl: '',
        arrow_svg: ''
    })
}

const removeItem = (sectionIndex, itemIndex) => {
    formData.value[sectionIndex].item_list.splice(itemIndex, 1)
}

const handleFileChange = (file, sectionIndex, itemIndex) => {
    const reader = new FileReader()
    reader.onload = e => {
        formData.value[sectionIndex].item_list[itemIndex].item_pic = e.target.result
    }
    reader.readAsDataURL(file.raw)
}

</script>

<style lang="scss" scoped>
.visual-form-page {
    padding: 20px;

    .form-actions {
        text-align: right;
        margin-bottom: 20px;
    }

    .card {
        margin-bottom: 30px;
        padding: 20px;
    }

    .section-header {
        display: flex;
        gap: 10px;
        margin-bottom: 15px;
        align-items: center;
    }

    .item-card {
        flex: 1 1 48%;
        box-sizing: border-box;
        padding: 15px;
        margin-bottom: 20px;
        margin-right: 2%;
        border: 1px dashed #ccc;
        border-radius: 8px;
    }

    .item-list-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 0;
        justify-content: space-between;
    }

    .item-pic-container {
        text-align: center;
        margin-bottom: 10px;

        .item-pic {
            width: 100px;
            height: 100px;
            object-fit: cover;
            border-radius: 8px;
        }
    }

    .target-url-row {
        display: flex;
        align-items: center;
        gap: 10px;

        .url-note {
            font-size: 13px;
            color: #888;
            flex-shrink: 0;
        }
    }

    .add-section {
        text-align: center;
        margin-top: 20px;
    }
}
</style>