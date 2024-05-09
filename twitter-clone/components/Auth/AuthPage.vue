<template>
    <div class="flex h-screen">
        <div class="relative flex-1 hidden w-0 lg:block">
            <img src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" class="absolute inset-0 object-cover w-full h-full" alt="Auth Image">
        </div>
    
        <div class="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6
        lg:flex-none lg:px-20 xl:px-24">
                <!-- Conditional rendering based on the value of isLoginForm -->
                <AuthFormLogIn v-if="isLoginForm"/>
                <AuthFormRegister v-else/>
                <div class="mt-4">
                    <!-- Toggle between login and register forms -->
                    <button @click="toggleForm" class="text-sm text-blue-500">Switch to {{ isLoginForm ? 'Register' : 'Login' }}</button>
                </div>
        </div>
    </div>
</template>
<script setup>
// Variable to track whether the user is on the login or register page
const isLoginForm = ref(true);

// Function to toggle between login and register forms
const toggleForm = () => {
  isLoginForm.value = !isLoginForm.value;
};
</script>