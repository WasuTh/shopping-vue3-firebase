<script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import { useAdminUserStore } from '@/stores/admin/user'

import AdminLayout from '@/layouts/AdminLayout.vue'

import Table from '@/components/Table.vue'
import Edit from '@/components/icons/Edit.vue'

const adminUserStore = useAdminUserStore()

onMounted(() => {
    adminUserStore.loadUser()
})

const headersName = ['Name', 'Role', 'Status', 'Updated at',]

const changeStatus = (index, userData) => {
    userData.status = userData.status === 'active' ? 'inactive' : 'active'
    adminUserStore.updateUser(index, userData)
}
</script>
<template>
    <AdminLayout>
        <div class="p-10">
            <div class="p-4 flex justify-between">
                <span class="text-3xl font-bold">User</span>
            </div>
            <Table :headers="headersName">
                <tr v-for="(user, index) in adminUserStore.list" class="text-center">
                    <td class="font-bold">{{ user.name }}</td>
                    <td>{{ user.role }}</td>
                    <td>
                        <div class="badge" :class="user.status === 'active' ? 'badge-success' : 'badge-error'">
                            {{ user.status }}
                        </div>
                    </td>
                    <td>{{ user.updatedAt }}</td>
                    <td>
                        <div class="flex justify-center gap-2">
                            <RouterLink :to="{ name: 'admin-user-update', params: { id: index }}" class="btn btn-ghost">
                                <Edit></Edit>
                            </RouterLink>
                            <div class="btn btn-ghost" @click="changeStatus(index, user)">
                                {{ user.status === 'active' ? 'Disable' : 'Enable' }}
                            </div>
                        </div>
                    </td>
                </tr>
            </Table>
        </div>
    </AdminLayout>
</template>