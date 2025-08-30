<script setup>
import { RouterLink } from 'vue-router';

import { useAdminOrderStore } from '@/stores/admin/order';

import AdminLayout from '@/layouts/AdminLayout.vue'
import Table from '@/components/Table.vue';

const adminOrder = useAdminOrderStore()

console.log(adminOrder.list[0])

const headersName = ['Name','Images','Price','Status','Updated at',]
</script>
<template>
    <AdminLayout>
        <div class="p-10">
            <span class="text-3xl font-bold">Orders List</span>
            <Table :headers="headersName">
                <tr v-for="(order, index) in adminOrder.list"
                    class="text-center">
                    <td>{{ order.customerName }}</td>
                    <td>{{ order.totalPrice }}</td>
                    <td>{{ order.status }}</td>
                    <td>{{ order.updatedAt }}</td>
                    <td>
                        <RouterLink :to="{ name: 'admin-order-detail', params: { id: index } }" 
                            class="btn w-full rounded-md">See detail
                        </RouterLink>
                    </td>
                </tr>
            </Table>
        </div>
    </AdminLayout>
</template>