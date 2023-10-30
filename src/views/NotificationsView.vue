<script setup>
import axios from "@/utils/axios.js";
import { ref, onMounted } from "vue";
import {useRoute, useRouter} from "vue-router";
const notifications = ref([]);
const route = useRoute();
const router = useRouter();


onMounted(() => {
    getNotifications();
});

function getNotifications() {
    axios
        .get('/api/notifications/')
        .then(response => {
            notifications.value = response.data
        })
        .catch(error => {
            console.log('Error: ', error)
        })
}

async function readNotification(notification) {
    await axios
            .post(`/api/notifications/read/${notification.id}/`)
            .then(response => {
                if (notification.type_of_notification === 'post_like' || notification.type_of_notification === 'post_comment') {
                    router.push({name: 'post-view', params: {id: notification.post_id}})
                } else {
                    router.push({name: 'friends', params: {id: notification.created_for_id}})
                }
            })
            .catch(error => {
                console.log('Error: ', error)
            })
}
</script>

<template>
    <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
        <div class="main-center col-span-3 space-y-4">
            <div
                class="p-4 bg-white border border-gray-200 rounded-lg"
                v-for="notification in notifications"
                v-bind:key="notification.id"
                v-if="notifications.length"
            >
                {{ notification.body }}

                <button class="underline" @click="readNotification(notification)">Read more</button>
            </div>

            <div
                class="p-4 bg-white border border-gray-200 rounded-lg"
                v-else
            >
                You don't have any unread notifications!
            </div>
        </div>
    </div>
</template>