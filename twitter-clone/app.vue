<template>
  <NConfigProvider :theme-overrides="themeOverrides" >
    <NModalProvider>
      <NMessageProvider>
        <div :class="{'dark': darkMode}">
          <div class="bg-white dark:bg-dim-900">
            <!-- Loading page  -->
            <LoadinPage v-if="isAuthLoading"/>

            <!-- App  -->
            <div v-else-if="user" class="min-h-full w-full">
              <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-6 lg:gap-5">
                  
                    <!-- left -->
                    <div class="md:block md:col-span-2 xs-col-span-1 xl:col-span-2 overflow-y-auto">
                      <div class="sticky top-0">
                        <SideBarLeftBar @click="handleOpenTweetModal"/>
                      </div>
                    </div>

                    <!-- Main -->
                    <main class="col-span-11 md:col-span-6 xl:col-span-6 overflow-y-auto">
                        <NuxtPage/>
                    </main>

                    <!-- Right -->
                    <div class="hidden md:block xl:col-span-4 md:col-span-4 overflow-y-auto">
                      <div class="sticky top-0">
                        <SideBarRightBar/>
                      </div>
                    </div>

                    <SpeedInsights />
              </div>
            </div>

            <!-- Auth  -->
            <AuthPage v-else/>

            <UIModal :isOpen="postTweetModal"  @onClose="handleModalClose">
              <TweetForm :user="user" @tweet-posted="handleUpdate" :popup="true"/>
            </UIModal>

          </div>
        </div>
      </NMessageProvider>
  </NModalProvider>
  </NConfigProvider>
</template>

<script setup>
  import { SpeedInsights } from "@vercel/speed-insights/vue"
  import useAuth from "./composbles/useAuth";  
  import { NMessageProvider, NConfigProvider } from 'naive-ui'
  import { compareAsc, format } from "date-fns";
  import useTweets from '~/composbles/useTweets';

  const darkMode = ref(false)

  const { closePostTweetModal, usePostTweetModal, openPostTweetModal, useReplyTweet } = useTweets()
  const { useAuthUser, initAuth, useAuthLoading } = useAuth()
  const isAuthLoading = useAuthLoading()
  const user = useAuthUser()
  
  const postTweetModal = usePostTweetModal()

  function handleUpdate(tweet) {
    closePostTweetModal()

    navigateTo({
        path: `/status/${tweet.id}`
    })
  }

  function handleModalClose() {
    closePostTweetModal()
  }

  function handleOpenTweetModal() {
    openPostTweetModal(null)
  }

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
      feedbackTextColorError: !darkMode.value ? '#D22B2B' : '#ff8383',
      asteriskColor: !darkMode.value ? '#D22B2B' : '#ff8383',
    }
  }
</script>