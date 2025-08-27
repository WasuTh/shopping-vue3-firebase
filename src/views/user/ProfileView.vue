<script setup>
import UserLayout from '@/layouts/UserLayout.vue';

import { onMounted, ref } from "vue"

const fileName = ref('')
const email = ref('wasu@')
const name = ref('wasu')
const mode = ref('')

const profileImageUrl = ref('https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp')

const handleFile = (event) => {
    const file = event.target.files[0]
    fileName.value = file ? file.name : ""
    
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            profileImageUrl.value = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

const updateProfile = () => {
    const profileData = {
        imageUrl: profileImageUrl.value,
        name: name.value,
        email: email.value
    }
    localStorage.setItem('profile-data', JSON.stringify(profileData))
    alert('update success')
    window.location.reload()
}

onMounted(() => {
    let profileData = localStorage.getItem('profile-data')
    if (profileData) {
        profileData = JSON.parse(profileData)
        profileImageUrl.value = profileData.imageUrl
        name.value = profileData.name
        email.value = profileData.email
    }
})
</script>

<template>
    <UserLayout>
        <div
            class="max-w-2xl my-10 mx-auto p-5 border-base-200 border rounded-xl shadow-2xl bg-white flex flex-col gap-10">
            <span class="font-bold text-2xl">Your Profle</span>
            <div class="avatar mx-auto">
                <div class="w-24 rounded-full">
                    <img :src="profileImageUrl"
                        class="image" />
                </div>
            </div>

            <div class="mx-auto">
                <input id="file-upload" type="file" class="hidden" @change="handleFile"/>
                <div class="flex gap-3">
                    <button class="text-white py-2 px-4 rounded-lg bg-purple-600 hover:bg-purple-700 hover:cursor-pointer"
                        onclick="document.getElementById('file-upload').click()">
                        เลือกไฟล์
                    </button>
                    <p v-if="fileName" class="mt-2 text-gray-700 text-sm">
                        {{ fileName }}
                    </p>
                </div>
            </div>

            <div class="flex flex-col gap-5">
                <div>
                    <span>email</span>
                    <input v-model="email" type="text" class="w-full mt-3 p-3 border border-base-500 rounded-md"
                        placeholder="type here">
                </div>
                <div>
                    <span>name</span>
                    <input v-model="name" type="text" class="w-full mt-3 p-3 border border-base-500 rounded-md"
                        placeholder="type here">
                </div>
                <button @click="updateProfile"
                    class="uppercase w-full p-5 border rounded-md text-white bg-gray-600 hover:bg-gray-700 hover:cursor-pointer">update
                    profile</button>
            </div>
        </div>
    </UserLayout>
</template>