<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'

import Remove from '@/components/icons/Remove.vue'
import Edit from '@/components/icons/Edit.vue'
import Table from '@/components/Table.vue'

const headersName = ['Name','Role','Status','Updated at',]
</script>
<template>
    <AdminLayout>
        <Table :headers="headersName">

        </Table>
    </AdminLayout>
</template>