<template>
    <div>
        <MainSection title="Home" :loading="loading">
            this is home page
        </MainSection>
    </div>
</template>
<script setup>
const loading = ref(false)
</script>