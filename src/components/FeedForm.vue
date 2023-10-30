<script setup>
import axios from "@/utils/axios.js";
import {ref, toRefs} from "vue";

const props = defineProps({
    posts: {
        type: Array,
    },
    user: {
        type: Object,
    }
});
const {posts} = toRefs(props);
const {user} = toRefs(props);

const body = ref('');
const is_private = ref(false);
const url = ref('');
const file = ref(null);

function submitForm() {
    let formData = new FormData();
    formData.append('image', file.value.files[0]);
    formData.append('body', body.value);
    formData.append('is_private', is_private.value);

    axios
        .post('/api/posts/create/', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        .then(response => {
            console.log('data', response.data)

            posts.value.unshift(response.data)
            body.value = ''
            is_private.value = false
            file.value = null
            url.value = null

            if (user.value) {
                user.value.posts_count += 1
            }
        })
        .catch(error => {
            console.log('error', error)
        })
}
</script>

<template>
    <form v-on:submit.prevent="submitForm" method="post">
        <div class="p-4">
            <textarea v-model="body" class="p-4 w-full bg-gray-100 rounded-lg"
                      placeholder="What are you thinking about?"></textarea>

            <label>
                <input type="checkbox" v-model="is_private"> Private
            </label>

            <div id="preview" v-if="url">
                <img :src="url" class="w-[100px] mt-3 rounded-xl"/>
            </div>
        </div>

        <div class="p-4 border-t border-gray-100 flex justify-between">
            <label class="inline-block py-4 px-6 bg-gray-600 text-white rounded-lg">
                <input type="file" ref="file" @change="onFileChange">
                Attach image
            </label>

            <button class="inline-block py-4 px-6 bg-purple-600 text-white rounded-lg">Post</button>
        </div>
    </form>
</template>