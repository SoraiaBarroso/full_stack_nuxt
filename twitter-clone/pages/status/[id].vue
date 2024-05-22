<template>
    <div class="border-x border-white-200 dark:border-gray-700">
        <MainSection title="Tweet" :loading="loading">
           
            <Head>
                <Title></Title>
            </Head>

            

        </MainSection>
    </div>
</template>
<script setup>
const loading = ref(false)
</script>