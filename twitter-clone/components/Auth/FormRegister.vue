<template>
     <div>
        <div class="pt-5 space-y-6 w-80">

            <UIInput placeholder="@username" label="Username" v-model="data.username"/>
            
            <UIInput placeholder="*********" label="Password" 
            type="password" v-model="data.password"/>

            <UIInput placeholder="*********" label="Repeat password" 
            type="password" v-model="data.repeatPassword"/>

            <UIInput placeholder="@email" label="Email" v-model="data.email"/>

            <UIInput placeholder="@name" label="Name" v-model="data.name"/>

            <div>
                <UIButton @click="handleRegister" liquid size="sm" :disabled="!isFormAvailable">Register</UIButton>
            </div>

        </div>
   </div>
</template>
<script setup>
import useAuth from '~/composbles/useAuth';

const { register } = useAuth()

// get data from child component
const data = reactive({
    username: '',
    password: '',
    repeatPassword: '',
    email: '',
    name: '',
    loading: false
})

const isFormAvailable = ref(false)

watchEffect(() => {
    isFormAvailable.value = data.username !== '' && data.email !== '' && data.password !== '' && data.repeatPassword !== ''
})

async function handleRegister() {
    data.loading = true
    try {
        await register({
            username: data.username,
            password: data.password,
            repeatPassword: data.repeatPassword,
            email: data.email,
            name: data.name,
        })
    } catch(error) {
        console.log(error)
    } finally {
        data.loading = false
    }
}
</script>