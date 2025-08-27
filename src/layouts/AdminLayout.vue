<script setup>
import { onMounted, ref} from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const activeMenu = ref('')

onMounted(() => {
    activeMenu.value = route.name
})

const menus = [
    {
        name: 'Dashboard',
        routeName: 'admin-dashboard'
    },
    {
        name: 'User',
        routeName: 'admin-users-list'
    },
    {
        name: 'Product',
        routeName: 'admin-products-list'
    },
    {
        name: 'Order',
        routeName: 'admin-orders-list'
    },
    {
        name: 'Logout',
        routeName: 'admin-login'
    }
]

</script>
<template>
    <div class="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
            <!-- Page content here -->
            <slot></slot>

            <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">
                Open drawer
            </label>
        </div>
        <div class="drawer-side">
            <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                <!-- Sidebar content here -->
                <li>
                    <div class="my-3 text-3xl font-bold rounded-md">
                        <a>Wasu Backoffice</a>
                    </div>
                </li>
                <li v-for="menu in menus">
                    <RouterLink 
                        :to="{ name: menu.routeName}"
                        :class="menu.routeName === activeMenu ? 'active' : ''"
                        class="px-5 py-3 rounded-md">
                        <a>{{ menu.name }}</a>
                    </RouterLink>
                </li>
            </ul>
        </div>
    </div>

</template>
<style scoped>
.active {
    background-color: black;
    color: #fff;
}
</style>