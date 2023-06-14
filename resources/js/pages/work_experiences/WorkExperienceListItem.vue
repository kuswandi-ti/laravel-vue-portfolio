<script setup>
    const emit = defineEmits(['weDeleted', 'editWe', 'confirmWeDeletion'])

    const props = defineProps({
        we: Object,
        index: Number,
        selectAll: Boolean
    })

    const toggleSelection = () => {
        emit('toggleSelection', props.we)
    }
</script>

<template>
    <tr>
        <th class="text-center"><input type="checkbox" :checked="selectAll" @change="toggleSelection" /></th>
        <td class="text-center">{{ index + 1 }}</td>
        <td>{{ we.work_experience_name }}</td>
        <td>{{ we.work_experience_city }}</td>
        <td class="text-center">{{ we.work_experience_year_from }}</td>
        <td class="text-center">{{ we.work_experience_year_to }}</td>
        <td>{{ we.work_experience_position }}</td>
        <td>{{ we.work_experience_job_description }}</td>
        <td>{{ we.work_experience_reason_to_leave }}</td>
        <td class="text-center">
            <router-link to="#" @click.prevent="$emit('editWe', we)"><i class="fa fa-edit"></i></router-link>&nbsp;
            <router-link to="#" @click.prevent="$emit('confirmWeDeletion', we.id)"><i class="fa fa-trash text-danger"></i></router-link>
        </td>
    </tr>    
</template>