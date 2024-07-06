<template>
    <div :class="headerClass">
        <div>
            <NuxtImg class="mr-4 w-10 mt-2 h-10 rounded-full hover:brightness-90 object-cover" :src="author.profileImage" alt="user profile"/>
        </div>

        <div class="h-auto w-full flex flex-col">
            <div class="w-full flex">
                <span :class="hasMargin" class="text-gray-800 h-full flex items-center font-bold dark:text-white hover:underline decoration-1">{{author.name}}</span>
                
                <span class="text-sm text-left h-full flex gap-1 items-center w-auto font-medium text-gray-600 dark:text-gray-400">
                    <NuxtLink to="#">
                        {{ author.handle }}
                    </NuxtLink>
                    · {{ props.tweet.postedAtHuman }}
                </span>

                <div @click.stop.prevent class="ml-auto group hover:bg-blue-100 dark:hover:bg-blue-600/20 transition ease-in-out rounded-full w-8 flex justify-center items-center h-8" >
                    <NDropdown v-if="props.user?.name === author.name" @select="handleConfirm" placement="bottom-end" trigger="hover" :options="options">
                        <NButton><DeleteIcon class="w-4 h-4 text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400"/></NButton>
                    </NDropdown>
                    <DeleteIcon v-else class="w-4 h-4 text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400"/>
                </div>
            </div>
        
            <div class="w-full">
                <p v-if="props.tweet.replyTo" class="text-sm mb-2">
                    <span class="text-gray-500 dark:text-gray-400">
                        Replying to
                    </span>

                    <NuxtLink :to="replyToTweetUrl" class="text-blue-400 hover:text-blue-700">
                        {{ props.tweet.replyTo.author.handle }}
                    </NuxtLink>
                 </p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import DeleteIcon from '~/components/Icons/DeleteIcon.vue';
import useTweets from '~/composbles/useTweets';
import { NButton, useMessage, NDropdown, NIcon, useDialog  } from 'naive-ui'
import useEmitter from '~/composbles/useEmitter';
import TrashIcon from '~/components/Icons/TrashIcon.vue';

const emitter = useEmitter()

const {deleteTweet} = useTweets()

const message = useMessage()
const dialog = useDialog()

const handleConfirm = () => {
        dialog.error({
          title: 'Delete post?',
          content: 'This can’t be undone. Deleting this tweet will also remove all its replies.',
          positiveText: 'Delete',
          negativeText: 'Cancel',
          onPositiveClick: async () => {
            try {
                await deleteTweet(props.tweet.id)
                emitter.$emit('deleteSuccess')   
                message.success('Your post was deleted')
            } catch(error) {
                message.error('Error deleting post')
            }
          },
          onNegativeClick: () => {
            message.error('Your post was not deleted')
          }
    })
}

const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}

const options = [
    {
        label: "Delete Tweet",
        key: "Delete",
        icon: renderIcon(TrashIcon)
    },
]

const props = defineProps({
    tweet: {
        type: Object,
        required: true
    },
    user: {
        type: Object,
        required: false
    },
    isInStatusUrl: {
        type: Boolean,
        default: false
    }
})

const headerClass = computed(() => ({
    'p-4 pb-0 flex': true,
    'h-auto': props.tweet.replyTo && props.tweet.replyTo.author.handle,
    'h-12': !props.tweet.replyTo || !props.tweet.replyTo.author.handle,
    'h-14': props.isInStatusUrl
}));

const hasMargin = computed(() => author.name ? 'mr-1' : 'mr-0')
const author = props.tweet.author
const replyToTweetUrl = computed(() => `/status/${props.tweet?.replyTo?.id}`)
</script>