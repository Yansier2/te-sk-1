<template>
    <div class="form-wrapper">
        <el-card class="input-box" shadow="hover">
            <transition-group name="fade" tag="div" class="input-list">
                <div class="input-item" v-for="(item, index) in inputs" :key="item.id">
                    <el-input v-model="item.value" placeholder="请输入内容" class="input-field" />
                    <el-button type="danger" icon="el-icon-delete" @click="removeInput(index)" circle>删除</el-button>
                </div>
            </transition-group>
            <el-button type="primary" icon="el-icon-plus" @click="addInput" class="add-button">
                添加输入框
            </el-button>
        </el-card>
        <el-button type="success" @click="handleSubmit" :loading="isLoading" class="submit-button">
            提交
        </el-button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { linkpageget, linkpagechange } from '@/admin/api/index.js'



let idCounter = 0
const inputs = ref([{ id: idCounter++, value:'' }])
const isLoading = ref(false)

const fetchInitialData = async () => {
    isLoading.value = true
    linkpageget().then((res)=>{
        let reviceinputs = []
        reviceinputs = JSON.parse(res.data)
        inputs.value = reviceinputs.map(value => ({ id: idCounter++, value }))
    })
    isLoading.value = false
}
onMounted(() => {
    fetchInitialData()
})
const addInput = () => {
    inputs.value.push({ id: idCounter++, value: '' })
}

const removeInput = (index) => {
    inputs.value.splice(index, 1)
}

const handleSubmit = () => {
    let sendinputs = [] 
    inputs.value.forEach(ele => {
        sendinputs.push(ele.value)
    });
    sendinputs = JSON.stringify(sendinputs)
    isLoading.value = true
    linkpagechange(sendinputs).then((res)=>{
        ElMessage.success('修改已提交')
        isLoading.value = false
    })
}
</script>

<style lang="scss" scoped>
.form-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;

    .input-box {
        width: 100%;
        max-width: 600px;
        padding: 20px;

        .input-list {
            display: flex;
            flex-direction: column;
            gap: 12px;

            .input-item {
                display: flex;
                align-items: center;
                gap: 10px;
                animation: fadeIn 0.3s ease-in-out;

                .input-field {
                    flex: 1;
                }
            }
        }

        .add-button {
            margin-top: 16px;
        }
    }

    .submit-button {
        width: 200px;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}
</style>