<template>
    <div class="flex h-screen">
        <div class="relative flex-1 hidden w-0 lg:block">
            <NuxtImg
                src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                sizes="100vw 100vh sm:50vw md:400px"
                alt="Auth Image"
                class="absolute inset-0 object-cover w-full h-full" 
            />
        </div>
    
        <div class="flex flex-col justify-center items-center flex-1 px-4 py-12 sm:px-6
        lg:flex-none lg:px-20 xl:px-24">
            <AuthFormLogIn v-if="isLoginForm"/> 
            <AuthFormRegister v-else />             
            <span v-if="isLoginForm" class="dark:text-white w-80 pt-5 ml-1 cursor-default text-gray-700 text-sm">Don't have an account?<button class="text-blue-600 ml-1 dark:text-blue-300" @click="switchForm">Register</button></span>
            <span v-else class="dark:text-white w-80 pt-5 ml-1 cursor-default text-gray-700 text-sm">Already an user?<button class="text-blue-600 ml-1 dark:text-blue-300" @click="switchForm">Log In</button></span>
        </div>
    </div>
</template>
<script setup>
// Variable to track whether the user is on the login or register page
const isLoginForm = ref(true);

// Function to toggle between login and register forms
const switchForm = () => {
  isLoginForm.value = !isLoginForm.value;
};
</script>