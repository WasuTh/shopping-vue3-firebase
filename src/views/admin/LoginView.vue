<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
    <div class="mx-auto my-5 p-10 max-w-2xl fixed top-1/2 left-1/2 -translate-1/2 shadow-2xl rounded-md">
        <div class="w-xl my-10 text-center font-bold text-2xl">
            Login
        </div>
        <div class="">
            <span>email</span>
            <input type="text" placeholder="type here"
                class="my-3 p-3 bg-white border border-base-1 rounded-md w-full">
        </div>
        <div>
            <span>password</span>
            <input type="text" placeholder="type here" 
                class="my-3 p-3 bg-white border border-base-1 rounded-md w-full">
        </div>
        
        <RouterLink :to="{ name: 'admin-dashboard' }">
            <button class="w-full mt-10 p-5 uppercase bg-black text-white cursor-pointer">
                login
            </button>
        </RouterLink>
    </div>
</template>