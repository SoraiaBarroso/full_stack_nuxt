<template>
    <div class="flex flex-col">
        <div class="relative m-2">
          <div class="absolute flex items-center h-full pl-4 text-gray-600 cursor-pointer">
              <div class="w-6 h-6 flex justify-center items-center">
                  <IconsSearchIcon @click="handleSearch"/>
              </div>
          </div>
          <input
              v-model="search"
              @keydown.enter="handleSearch"
              class="flex items-center h-9 w-full pl-12 text-sm font-normal text-black dark:text-gray-400 bg-gray-100 border border-gray-200 rounded-full
              shadow dark:bg-dim-400 dark:border-dim-400 focus:bg-gray-100 dark:focus:bg-dim-900 focus:outline-none focus:border-blue-200 focus:border" 
              type="text"
              placeholder="Search tweet"
              >
        </div>
        <div v-if="loading" class="flex items-center justify-center p-4 border ">
            <IconsSpinner/>
        </div>
        <div v-else>
            <TweetListFeed :user="user" :tweets="searchTweets" @delete-succes="reloadHomeTweets"/>
        </div>
    </div>
</template>
<script setup>
import useTweets from '~/composbles/useTweets';
import useAuth from '~/composbles/useAuth';

const searchQuery = ref(''); // Initialize with current query parameter
const loading = ref(false);
const searchTweets = ref([])
const search = ref('')

const { getHomeTweets } = useTweets()
const { useAuthUser } = useAuth()

const user = useAuthUser()

const handleSearch = () => {
    if (search.value !== '') {
        searchQuery.value = search.value
        reloadHomeTweets()
    }
}

const reloadHomeTweets = async () => {
    loading.value = true;
    try {
        const { tweets } = await getHomeTweets({
            query: searchQuery.value
        });
        searchTweets.value = tweets;
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
};
</script>