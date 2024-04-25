<template>
    <div class="bg-red-100 h-screen flex flex-col">
        <div class="w-min p-2 my-2 rounded-full hover:bg-blue-50
        dark:hover:bg-white/20" :class="transition"
        >
            <nuxt-link to="/">
                <div class="w-8 h-8">
                    <IconsTwitter/>
                    <h1>adw</h1>
                </div>
            </nuxt-link>   
        </div>
    </div>
</template>
<script setup>
    const transition = 'transition ease-in-out duration-350'
</script>