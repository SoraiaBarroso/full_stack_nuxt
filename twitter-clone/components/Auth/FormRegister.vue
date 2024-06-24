<template>
     <div>
        <div class="pt-5 space-y-6 w-80 relative">

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
                    <NInput v-model:value="model.password" placeholder="**********" type="password" round/>
                </NFormItem>

                <NFormItem label="Repeat password" path="repeatPassword">
                    <NInput v-model:value="model.repeatPassword" placeholder="**********" type="password" round/>
                </NFormItem>

                <NFormItem label="Email" path="email">
                    <NInput type="email" v-model:value="model.email" placeholder="email" round/>
                </NFormItem>

                <NFormItem label="Name" path="name">
                    <NInput v-model:value="model.name" placeholder="name" round/>
                </NFormItem>
            </NForm>
           
            <div>
                <UIButton @click="handleRegister" liquid size="sm" :disabled="!isFormAvailable">Register</UIButton>
            </div>

        </div>
   </div>
</template>
<script setup>
import useAuth from '~/composbles/useAuth';
import { NInput, NForm, NFormItem, useMessage } from 'naive-ui'
import { watchImmediate } from '@vueuse/core'

const { register } = useAuth()
const formRef = ref(null) 
const message = useMessage()

const model = reactive({
    username: '',
    password: '',
    repeatPassword: '',
    email: '',
    name: '',
    errorMessage: '',
})

const rules = {
  username: [
    { required: true, message: 'Username is required', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Password is required', trigger: 'blur' }
  ],
  repeatPassword: [
    { required: true, message: 'Repeat password is required', trigger: 'blur' },
    { validator: checkPasswordMatch, trigger: 'blur' } // Custom validation rule
  ],
  email: [
    { required: true, message: 'Email is required', trigger: 'blur' }
  ],
}

const isFormAvailable = ref(false)

watchImmediate(model, () => {
    isFormAvailable.value = model.username !== '' && model.email !== '' && model.password !== '' && model.repeatPassword !== '' && model.password === model.repeatPassword
}, { deep: true })

async function handleRegister() {
    try {
        message.loading('Registering...')

        await register({
            username: model.username,
            password: model.password,
            repeatPassword: model.repeatPassword,
            email: model.email,
            name: model.name,
        })

        message.success('Registered successful!')
    } catch(error) {
        model.errorMessage = error.message ? error.message.split('0 ')[1] : 'An error occurred'
        message.error(model.errorMessage)
    } finally {
        message.clear()
    }
}


function checkPasswordMatch(rule, value, callback) {
    if (value !== model.password) {
        callback(new Error('The passwords do not match'))
    } else {
        callback() // Pass validation
    }
}
</script>