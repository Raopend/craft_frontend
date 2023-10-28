<script setup>
import PeopleYouMayKnow from "@/components/PeopleYouMayKnow.vue";
import Trends from "@/components/Trends.vue";
import axios from "@/utils/axios.js";
import {onMounted, ref} from "vue";
import FeedItem from "@/components/FeedItem.vue";

onMounted(() => {
    getFeed()
})

const posts = ref([])
const body = ref('')

function getFeed() {
    axios
        .get('api/posts/')
        .then(response => {
            console.log('response', response.data)
            posts.value = response.data
        })
        .catch(error => {
            console.log('error', error)
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
                console.log('error', error)
            })
}
</script>

<template>
    <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
        <div class="main-left col-span-1">
            <div class="p-4 bg-white border border-gray-200 text-center rounded-lg">
                <img src="https://i.pravatar.cc/40?img=20" class="mb-6 rounded-full">

                <p><strong>Code With Stein</strong></p>

                <div class="mt-6 flex space-x-8 justify-around">
                    <p class="text-xs text-gray-500">182 friends</p>
                    <p class="text-xs text-gray-500">120 posts</p>
                </div>
            </div>
        </div>

        <div class="main-center col-span-2 space-y-4">
            <div class="bg-white border border-gray-200 rounded-lg">
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
                <FeedItem v-bind:post="post" />
            </div>
        </div>

        <div class="main-right col-span-1 space-y-4">
            <PeopleYouMayKnow/>
            <Trends/>
        </div>
    </div>
</template>