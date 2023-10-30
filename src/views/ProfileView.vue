<script setup>
import PeopleYouMayKnow from "@/components/PeopleYouMayKnow.vue";
import Trends from "@/components/Trends.vue";
import axios from "@/utils/axios.js";
import {useUserStore} from "@/stores/user.js";
import {useToastStore} from "@/stores/toast.js";
import {onMounted, ref, watch} from "vue";
import FeedItem from "@/components/FeedItem.vue";
import {useRoute} from 'vue-router'
import router from "@/router/index.js";

onMounted(() => {
    getFeed()
});
const route = useRoute();

const posts = ref([]);
const body = ref('');
const user = ref({});
const userStore = useUserStore();
const toastStore = useToastStore();


watch(() => route.params.id, () => {
    getFeed()
}, {immediate: true});

function getFeed() {
    console.log('router', route.params.id)
    axios
        .get(`api/posts/profile/${route.params.id}/`)
        .then(response => {
            posts.value = response.data.posts;
            user.value = response.data.user;
        })
        .catch(error => {
            console.log('error', error);
        })
}

function submitForm() {
    console.log('body', body.value);
    axios
        .post('api/posts/create/', {
            body: body.value
        })
        .then(response => {
            console.log('response', response.data);
            posts.value.unshift(response.data);
            body.value = '';
        })
        .catch(error => {
            console.log('error', error);
        })
}

function sendFriendshipRequest() {
    axios
        .post(`api/friends/${router.currentRoute.value.params.id}/request/`, {})
        .then(response => {
            console.log('response', response.data);
            if (response.data.message === 'request already sent') {
                toastStore.showToast(5000, 'The request has already been sent!', 'bg-red-300')
            } else {
                toastStore.showToast(5000, 'The request was sent!', 'bg-emerald-300')
            }
        })
        .catch(error => {
            console.log('error', error);
        })
}

function sendDirectMessage() {
    axios
      .get(`/api/chat/${router.currentRoute.value.params.id}/get-or-create/`)
      .then(response => {
          router.push('/chat')
      })
      .catch(error => {
      })
}

function logout() {
    userStore.removeToken();
    router.push({
        name: 'login'
    })
}
</script>

<template>
    <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
        <div class="main-left col-span-1">
            <div class="p-4 bg-white border border-gray-200 text-center rounded-lg">
                <img :src="user.get_avatar" class="mb-6 rounded-full mx-auto">

                <p><strong>{{ user.name }}</strong></p>

                <div class="mt-6 flex space-x-8 justify-around">
                    <RouterLink :to="{name: 'friends', params: {id: user.id}}" class="text-xs text-gray-500">{{ user.friends_count }} friends</RouterLink>
                    <p class="text-xs text-gray-500">{{ user.posts_count }} posts</p>
                </div>
                <div class="mt-6">
                    <button class="inline-block py-4 px-3 bg-purple-600 text-xs text-white rounded-lg"
                            @click="sendFriendshipRequest"
                            v-if="userStore.user.id !== user.id"
                    > Send friendship request
                    </button>
                  <button
                        class="inline-block mt-4 py-4 px-3 bg-purple-600 text-xs text-white rounded-lg"
                        @click="sendDirectMessage"
                        v-if="userStore.user.id !== user.id"
                    >
                        Send direct message
                    </button>
                    <RouterLink
                        class="inline-block mr-2 py-4 px-3 bg-purple-600 text-xs text-white rounded-lg"
                        to="/profile/edit"
                        v-if="userStore.user.id === user.id"
                    >
                        Edit profile
                    </RouterLink>
                    <button class="inline-block py-4 px-3 bg-red-600 text-xs text-white rounded-lg"
                            @click="logout"
                            v-if="userStore.user.id === user.id"
                    > Log out
                    </button>
                </div>
            </div>
        </div>

        <div class="main-center col-span-2 space-y-4">
            <div class="bg-white border border-gray-200 rounded-lg"
                 v-if="userStore.user.id === user.id"
            >
                <form method="post" v-on:submit.prevent="submitForm">
                    <div class="p-4">
                    <textarea class="p-4 w-full bg-gray-100 rounded-lg"
                              placeholder="What are you thinking about?"
                              v-model="body"
                    ></textarea>
                    </div>

                    <div class="p-4 border-t border-gray-100 flex justify-between">
                        <a href="#" class="inline-block py-4 px-6 bg-gray-600 text-white rounded-lg">Attach image</a>

                        <button class="inline-block py-4 px-6 bg-purple-600 text-white rounded-lg">Post</button>
                    </div>
                </form>
            </div>

            <div class="p-4 bg-white border border-gray-200 rounded-lg"
                 v-for="post in posts"
                 v-bind:key="post.id"
            >
                <FeedItem v-bind:post="post"/>
            </div>
        </div>

        <div class="main-right col-span-1 space-y-4">
            <PeopleYouMayKnow/>
            <Trends/>
        </div>
    </div>
</template>