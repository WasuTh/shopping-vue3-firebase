<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter, } from 'vue-router';

import { useCartStore } from '@/stores/user/cart';

const router = useRouter()
const cartStore = useCartStore()

const isLoggedIn = ref(false);
const searchText = ref('')

onMounted(() => {
    if (localStorage.getItem('isLoggedIn')) {
        isLoggedIn.value = true
    }
})

const login = () => {
    isLoggedIn.value = true
    localStorage.setItem('isLoggedIn', true)
}

const logout = async () => {
    isLoggedIn.value = false
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('cart-data')
    localStorage.removeItem('order-data')
    await router.push({ name: 'home' })
    window.location.reload()
}

const handleSearch = (event) => {
    if (event.key === 'Enter') {
        router.push({
            name: 'search',
            query: {
                q: searchText.value
            }
        })
    }
}

</script>
<template>
    <div class="container w-screen max-w-full">
        
        <!-- header -->
        <div class="navbar bg-base-100 shadow-sm px-20 py-5">

            <!-- nav-left = logo -->
            <div class="flex-1">
                <RouterLink :to="{ name: 'home' }">
                    <a class="btn btn-ghost text-xl">AOM shop</a>
                </RouterLink>
            </div>

            <!-- nav-right -->
            <div class="flex gap-2">
                <!-- search bar -->
                <input type="text" 
                placeholder="Search" 
                class="input input-bordered w-24 md:w-auto"
                v-model="searchText"
                @keyup="handleSearch"/>

                <!-- cart -->
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                        <div class="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span class="badge badge-sm indicator-item">{{ cartStore.summaryQuantity }}</span>
                        </div>
                    </div>
                    <div tabindex="0" class="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                        <div class="card-body">
                            <span class="text-lg font-bold">{{ cartStore.summaryQuantity }} items</span>
                            <span class="text-info">Subtotal: {{ cartStore.summaryPrice }} B</span>
                            <div class="card-actions">
                                <RouterLink :to="{ name: 'cart' }" class="btn btn-primary btn-block">
                                        View cart
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- login -->
                <button class="btn btn-ghost"
                v-if="!isLoggedIn"
                @click="login()">Login</button>

                <!-- profile -->
                <div class="dropdown dropdown-end"
                v-if="isLoggedIn">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul tabindex="0"
                        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <RouterLink :to="{ name : 'profile' }">
                                <a>Profile</a>
                            </RouterLink>
                        </li>
                        <li>
                            <a @click="logout()">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <slot></slot>

        <!-- footer -->
        <footer class="footer sm:footer-horizontal bg-neutral text-neutral-content p-10 w-full">
            <nav>
                <h6 class="footer-title">Services</h6>
                <a class="link link-hover">Branding</a>
                <a class="link link-hover">Design</a>
                <a class="link link-hover">Marketing</a>
                <a class="link link-hover">Advertisement</a>
            </nav>
            <nav>
                <h6 class="footer-title">Company</h6>
                <a class="link link-hover">About us</a>
                <a class="link link-hover">Contact</a>
                <a class="link link-hover">Jobs</a>
                <a class="link link-hover">Press kit</a>
            </nav>
            <nav>
                <h6 class="footer-title">Legal</h6>
                <a class="link link-hover">Terms of use</a>
                <a class="link link-hover">Privacy policy</a>
                <a class="link link-hover">Cookie policy</a>
            </nav>
        </footer>
    </div>
</template>