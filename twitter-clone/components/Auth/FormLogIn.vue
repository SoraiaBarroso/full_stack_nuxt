<template>
   <div>
        <div class="pt-5 space-y-6 w-80 relative">
            <IconsTwitter class="h-10 w-10 m-auto mb-10"/>

            <UIInput :invalid="data.errorMessage !== ''" placeholder="@username" label="Username *" v-model="data.username"/>
            
            <div v-if="data.loading" class="bg-white top-0 h-96 w-full absolute flex justify-center dark:bg-dim-900 items-center">
                <IconsSpinner class="mb-10"/>
            </div>

            <UIInput :invalid="data.errorMessage !== ''" placeholder="*********" label="Password *" 
            type="password" v-model="data.password"/>

            <div v-if="data.errorMessage" class="text-red-500">{{ data.errorMessage }}</div>

            <div>
                <UIButton @click="handleLogin" liquid size="sm" :disabled="!isFormAvailable">Log In</UIButton>
            </div>

        </div>
   </div>
</template>
  
<script setup>
import useAuth from '~/composbles/useAuth';

const { login } = useAuth()

// get password and username from child component
const data = reactive({
    password: '',
    username: '',
    errorMessage: '',
    loading: false
})

const isFormAvailable = ref(false)

watchEffect(() => {
    isFormAvailable.value = data.password !== '' && data.username !== ''
})

async function handleLogin() {
    data.loading = true
    try {
        await login({
            username: data.username,
            password: data.password
        })
    } catch(error) {
        data.errorMessage = error.message ? error.message.split('0 ')[1] : 'An error occurred' // Extract relevant part of error message        console.log(error)
    } finally {
        data.loading = false
    }
}

</script>