<template>
   <div>
        <div class="pt-5 space-y-6 w-80">
            <h1 class="text-gray-600 font-bold pb-4 text-4xl text-left dark:text-white">Log in to Twitter</h1>

            <UIInput placeholder="@username" label="Username" v-model="data.username"/>
            
            <UIInput placeholder="*********" label="Password" 
            type="password" v-model="data.password"/>

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
        console.log(error)
   } finally {
        data.loading = false
   }
}

</script>