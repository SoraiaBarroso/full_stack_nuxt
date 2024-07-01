<template>
    <div class="flex justify-between ml-1">
        <div class="flex items-center w-3/4 justify-between">
            <TweetItemActionsIcons @on-click="emits('onCommentClick')" color="blue">
                <template v-slot:icon="{ classes }">
                    <IconsChatIcon :class="classes"/>
                </template>

                <template v-slot:default> 
                    {{ props.tweet.repliesCount }}
                </template>
            </TweetItemActionsIcons>

            <TweetItemActionsIcons color="green">
                <template v-slot:icon="{ classes }">
                    <IconsRefreshIcon :class="classes"/>
                </template>

                <template v-slot:default> 
                    {{ generateRandomNumber() }}
                </template>
            </TweetItemActionsIcons>

            <TweetItemActionsIcons color="red" @click="handleLike">
                <template v-slot:icon="{ classes }">
                    <IconsHeartIcon :class="classes" v-if="!liked"/>
                    <IconsHeartFilledIcon v-else class="text-red-500 h-5 w-5"/>
                </template>

                <template v-slot:default> 
                     <span :class="liked ? 'text-red-500' : ''">{{ tweet.likesCount  }}</span>
                </template>
            </TweetItemActionsIcons>

            <TweetItemActionsIcons color="blue">
                <template v-slot:icon="{ classes }">
                    <IconsStatsIcon :class="classes"/>
                </template>

                <template v-slot:default> 
                    {{ generateRandomNumber() }}
                </template>
            </TweetItemActionsIcons>
        </div>
        <div class="flex w-1/4 justify-end">
            <TweetItemActionsIcons color="blue">
                <template v-slot:icon="{ classes }">
                    <IconsBookmarkIcon :class="classes"/>
                </template>
                <template v-slot:default> 
                    
                </template>
            </TweetItemActionsIcons>
            <TweetItemActionsIcons color="blue">
                <template v-slot:icon="{ classes }">
                    <IconsUploadIcon :class="classes"/>
                </template>
                <template v-slot:default> 
                    
                </template>
            </TweetItemActionsIcons>
        </div>
    </div>
</template>
<script setup>
import useTweets from '~/composbles/useTweets';
const { updateLikeCount } = useTweets()

const props = defineProps({
    tweet: {
        type: Object,
        required: true
    },
    user: {
        type: Object,
        required: false
    }
})

const emits = defineEmits(['onCommentClick'])

const liked = ref(false)
const tweet = ref({ ...props.tweet });

watchEffect(() => {
    liked.value = tweet.value.likedBy.includes(props.user.id);
});

const handleLike = async () => {
    liked.value = !liked.value;

    try {
        if (liked.value) {
            // Add user ID to likedBy array and increment likesCount
            tweet.value.likedBy.push(props.user.id);
            tweet.value.likesCount++;
        } else {
            // Remove user ID from likedBy array and decrement likesCount
            const index = tweet.value.likedBy.indexOf(props.user.id);
            if (index !== -1) {
                tweet.value.likedBy.splice(index, 1);
                tweet.value.likesCount--;
            }
        }

        // Send the updated likedBy array to the backend
        await updateLikeCount(tweet.value.id, tweet.value.likesCount, tweet.value.likedBy);
    } catch (error) {
        console.error('Failed to update like:', error);
    }
};

function generateRandomNumber() {
    let ran = Math.floor(Math.random() * 10000);
    return formatLikeCount(ran);
}

function formatLikeCount(number) {
    if (number > 1000) {
        let formattedNumber = (number / 1000).toFixed(1);
        return `${formattedNumber}K`;
    } else {
        return number.toString();
    }
}
</script>