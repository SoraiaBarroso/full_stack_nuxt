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
           

            <!-- <UIInput :invalid="data.errorMessage !== ''" placeholder="@username" label="Username *" v-model="data.username"/>
            
            <div v-if="data.loading" class="bg-white top-0 h-96 w-full absolute flex justify-center dark:bg-dim-900 items-center">
                <IconsSpinner class="mb-10"/>
            </div>

            <UIInput :invalid="data.errorMessage !== ''" placeholder="*********" label="Password *" 
            type="password" v-model="data.password"/>

            <div v-if="data.errorMessage" class="text-red-500">{{ data.errorMessage }}</div> -->

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

const formRef = ref(null) // keep track of input values
const message = useMessage()

const model = reactive({
    username: '',
    password: '', 
    loading: false,
    errorMessage: ''
})

const rules = {
  username: [
    { required: true, message: 'Email is required', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Password is required', trigger: 'blur' }
  ]
}

const { login } = useAuth()

// get password and username from child component
// const data = reactive({
//     password: '',
//     username: '',
//     errorMessage: '',
//     loading: false
// })

const isFormAvailable = ref(false)

watchImmediate(model, () => {
    isFormAvailable.value = model.password !== '' && model.username !== ''
}, { deep: true })

async function handleLogin() {
    model.loading = true
    try {
        await login({
            username: model.username,
            password: model.password
        })
    } catch(error) {
        model.errorMessage = error.message ? error.message.split('0 ')[1] : 'An error occurred' // Extract relevant part of error message        console.log(error)
    } finally {
        model.loading = false
    }
}

</script>