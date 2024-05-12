<template>
  <div :class="{'dark': darkMode}">
    <div class="bg-white dark:bg-dim-900">

      <!-- Loading page  -->
      <LoadinPage v-if="isAuthLoading"/>

      <!-- App  -->
      <div v-else-if="user" class="min-h-full">
        <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-6 lg:gap-5">
             
              <!-- left -->
              <div class="md:block md:col-span-1 xs-col-span-1 xl:col-span-2 overflow-y-auto">
                <div class="sticky top-0">
                  <SideBarLeftBar/>
                </div>
              </div>

              <!-- Main -->
              <main class="col-span-11 md:col-span-8 xl:col-span-6 overflow-y-auto">
                  <NuxtPage/>
              </main>

              <!-- Right -->
              <div class="hidden md:block xl:col-span-4 md:col-span-3 overflow-y-auto">
                <div class="sticky top-0">
                  <SideBarRightBar/>
                </div>
              </div>

              <SpeedInsights />
        </div>
      </div>

      <!-- Auth  -->
      <AuthPage v-else/>

    </div>
</div>
</template>

<script setup>
  import { SpeedInsights } from "@vercel/speed-insights/vue"
  import useAuth from "./composbles/useAuth";  
  
  const darkMode = ref(true)

  const { useAuthUser, initAuth, useAuthLoading } = useAuth()
  const isAuthLoading = useAuthLoading()
  const user = useAuthUser()

  onBeforeMount(() => {
    initAuth()
  })
</script>