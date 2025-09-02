<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useAdminUserStore } from '@/stores/admin/user';
import { useEventStore } from '@/stores/event';

import AdminLayout from '@/layouts/AdminLayout.vue'

const adminUser = useAdminUserStore()
const eventStore = useEventStore()

const route = useRoute()
const router = useRouter()

const userIndex = ref(-1)

const userData = ref({
    name: '',
    role: '',
    status: '',
})

onMounted(() => {
    if (route.params.id) {
        userIndex.value = route.params.id
        const selectedUser = adminUser.getUser(userIndex.value)
        
        console.log(selectedUser)

        const updateUserData = {
            ...userData.value,
            ...selectedUser,
        }
        userData.value = updateUserData
    }
})

const formData = [
    {
        name: 'Name',
        field: 'name',
        type: 'text'
    },
    {
        name: 'Role',
        field: 'role',
        type: 'select',
        dropdown: ['admin', 'moderator', 'user']
    },
    {
        name: 'Stauts',
        field: 'status',
        type: 'select',
        dropdown: ['active', 'inactive']
    },
]

const updateUser = () => {
    adminUser.updateUser(userIndex.value, userData.value)
    eventStore.popupMessage('success','update user successfull')
    router.push({ name: 'admin-users-list' })
}

</script>
<template>
    <AdminLayout>
        <div class="m-10 p-10 shadow-2xl">
            <div class="mb-10 text-3xl font-bold">Update user id: {{ route.params.id }}</div>
            <div v-for="form in formData">
                <input v-if="form.type === 'text'" 
                    v-model="userData[form.field]"
                    type="text" class="pl-5 input input-lg w-full text-xl">
                <select v-if="form.type === 'select'"
                    v-model="userData[form.field]"
                    class="w-full mt-5 text-xl select select-lg select-ghost border border-gray-500">
                    <option disabled selected>choose {{ form.name }}</option>
                    <option v-for="item in form.dropdown">
                        {{ item }}
                    </option>
                </select>
            </div>
            <div class="mt-10 pt-10 flex justify-end gap-10 border-t">
                <RouterLink :to="{ name: 'admin-users-list' }"
                    class="px-5 uppercase btn btn-ghost rounded-md bg-slate-200">
                    back
                </RouterLink>
                <button @click="updateUser" 
                    class="px-5 uppercase btn btn-success rounded-md">
                    update
                </button>
            </div>
        </div>
    </AdminLayout>
</template>