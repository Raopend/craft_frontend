<script setup>
import axios from "@/utils/axios.js";
import {onMounted, ref} from "vue";

const users = ref([]);

onMounted(() => {
    getFriendSuggestions()
});
function getFriendSuggestions() {
    axios
        .get('/api/friends/suggested/')
        .then(response => {
            users.value = response.data
        })
        .catch(error => {
            console.log('error', error)
        })
}
</script>

<template>
    <div class="p-4 bg-white border border-gray-200 rounded-lg">
        <h3 class="mb-6 text-xl">People you may know</h3>

        <div class="space-y-4">
            <div
                class="flex items-center justify-between"
                v-for="user in users"
                v-bind:key="user.id"
            >
                <div class="flex items-center space-x-2">
                    <img :src="user.get_avatar" class="w-[40px] rounded-full">

                    <p class="text-xs"><strong>{{ user.name }}</strong></p>
                </div>

                <RouterLink :to="{name: 'profile', params: {id: user.id}}" class="py-2 px-3 bg-purple-600 text-white text-xs rounded-lg">Show</RouterLink>
            </div>
        </div>
    </div>
</template>