<template>
   <div>
        <div class="pt-5 space-y-6 w-80 relative">
            <IconsTwitter class="h-10 w-10 m-auto mb-10"/>

            <NForm
                ref="formRef"
                :label-width="80"
                :model="model"
                :rules="rules"
            >
                <NFormItem label="Username" path="username">
                    <NInput v-model:value="model.username" placeholder="@username" round/>
                </NFormItem>

                <NFormItem label="Password" path="password">
                    <NInput v-model:value="model.password" placeholder="**********"  type="password" round/>
                </NFormItem>
            </NForm>
        
            <div>
                <UIButton @click="handleLogin" liquid size="sm" :disabled="!isFormAvailable">Log In</UIButton>
            </div>

        </div>
   </div>
</template>
  
<script setup>
import useAuth from '~/composbles/useAuth';
import { NInput, NForm, NFormItem, useMessage } from 'naive-ui'
import { watchImmediate } from '@vueuse/core'

const { login } = useAuth()

const formRef = ref(null) // keep track of input values
const message = useMessage()

const model = reactive({
    username: '',
    password: '', 
    errorMessage: ''
})

const rules = {
  username: [
    { required: true, message: 'Email is required', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Password is required', trigger: 'blur' },
  ]
}

const isFormAvailable = ref(false)

watchImmediate(model, () => {
    isFormAvailable.value = model.password !== '' && model.username !== ''
}, { deep: true })

async function handleLogin() {
    try {
        message.loading('Logging in...')
        
        await login({
            username: model.username,
            password: model.password
        })
        
        message.success('Login successful!')
    } catch(error) {
        model.errorMessage = error.message ? error.message.split('0 ')[1] : 'An error occurred' 
        message.error(model.errorMessage)
    } finally {
        message.clear()
    }
}
</script>