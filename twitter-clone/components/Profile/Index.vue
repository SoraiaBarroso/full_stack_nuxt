<template>
    <div>
        <ProfileHeader :user="user"/>
        <ProfileInfo :user="user"/>
    </div>
</template>
<script setup>
import useAuth from '~/composbles/useAuth';

const { useAuthUser } = useAuth()

const user = useAuthUser()
</script>