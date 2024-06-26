<template>
    <div class="flex justify-between">
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
                    <span :class="liked ? 'text-red-500' : ''">{{ likeCount }}</span>
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
const props = defineProps({
    tweet: {
        type: Object,
        required: true
    }
})

const emits = defineEmits(['onCommentClick'])

const liked = ref(false)
const likeCount = ref(generateRandomNumber())

const handleLike = () => {
    liked.value = !liked.value
    if (liked.value) {
        // Increment the like count by 1
        likeCount.value = parseLikeCount(likeCount.value) + 1
    } else {
        // Decrement the like count by 1
        likeCount.value = parseLikeCount(likeCount.value) - 1
    }
    likeCount.value = formatLikeCount(likeCount.value)
}

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

function parseLikeCount(formattedNumber) {
    if (formattedNumber.includes('K')) {
        return parseFloat(formattedNumber.replace('K', '')) * 1000;
    } else {
        return parseInt(formattedNumber);
    }
}
</script>