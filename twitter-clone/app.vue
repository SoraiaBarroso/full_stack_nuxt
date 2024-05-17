<template>
  <NConfigProvider :theme-overrides="themeOverrides" inline-theme-disabled>
    <NMessageProvider>
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
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup>
  import { SpeedInsights } from "@vercel/speed-insights/vue"
  import useAuth from "./composbles/useAuth";  
  import { NMessageProvider, NConfigProvider  } from 'naive-ui'
  import { compareAsc, format } from "date-fns";

  const darkMode = ref(false)

  const { useAuthUser, initAuth, useAuthLoading } = useAuth()
  const isAuthLoading = useAuthLoading()
  const user = useAuthUser()

  onBeforeMount(() => {
    initAuth()
  })

  const themeOverrides = {
    Input: {
      borderHover: !darkMode.value ? '1px solid #3B82F6' : '1px solid #a5e4ff',
      borderFocus: !darkMode.value ? '1px solid #3B82F6' : '1px solid #a5e4ff ',
      caretColor: !darkMode.value ? '#3B82F6' : "#ffffff",
    },
    Form: {
      labelTextColor: !darkMode.value ? '#374151' : '#e3e3dd',
      feedbackTextColorError: !darkMode.value ? '' : '#ff8383',
      asteriskColor: !darkMode.value ? '' : '#ff8383',
    }
  }
</script>