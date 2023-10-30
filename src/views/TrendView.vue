<script setup>
import FeedItem from "@/components/FeedItem.vue";
import PeopleYouMayKnow from "@/components/PeopleYouMayKnow.vue";
import Trends from "@/components/Trends.vue";

import axios from "@/utils/axios.js";
import {ref, watch} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();
const posts = ref([]);

function getFeed() {
    axios
        .get(`/api/posts/?trend=${route.params.id}`)
        .then(response => {
            posts.value = response.data
        })
        .catch(error => {
            console.log('error', error)
        })
}

watch (() => route.params.id, () => {
    getFeed()
}, {immediate: true})
</script>
<template>
    <div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
        <div class="main-center col-span-3 space-y-4">
            <div
                class="p-4 bg-white border border-gray-200 rounded-lg"
            >
                <h2 class="text-xl">Trend: #{{ route.params.id }}</h2>
            </div>

            <div
                class="p-4 bg-white border border-gray-200 rounded-lg"
                v-for="post in posts"
                v-bind:key="post.id"
            >
                <FeedItem v-bind:post="post" />
            </div>
        </div>

        <div class="main-right col-span-1 space-y-4">
            <PeopleYouMayKnow />

            <Trends />
        </div>
    </div>
</template>