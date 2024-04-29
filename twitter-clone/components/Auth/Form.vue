<template>
   <div>
        <div class="pt-5 space-y-6">

            <UIInput placeholder="@username" label="Username" v-model="data.username"/>
            
            <UIInput placeholder="*********" label="Password" 
            type="password" v-model="data.password"/>

            <div>
                <button @click="handleLogin">Login</button>
            </div>
        </div>
   </div>
</template>
  
<script setup>
import useAuth from '~/composbles/useAuth';

const {login} = useAuth()

// get password and username from child component
const data = reactive({
    password: '',
    username: '',
    loading: false
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