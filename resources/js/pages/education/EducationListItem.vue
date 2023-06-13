<script setup>
    const emit = defineEmits(['educationDeleted', 'editEducation', 'confirmEducationDeletion'])

    const props = defineProps({
        education: Object,
        index: Number,
        selectAll: Boolean
    })

    const toggleSelection = () => {
        emit('toggleSelection', props.education)
    }
</script>

<template>
    <tr>
        <th class="text-center"><input type="checkbox" :checked="selectAll" @change="toggleSelection" /></th>
        <td class="text-center">{{ index + 1 }}</td>
        <td>{{ education.education_name }}</td>
        <td>{{ education.education_city }}</td>
        <td>{{ education.education_major }}</td>
        <td class="text-center">{{ education.education_year_from }}</td>
        <td class="text-center">{{ education.education_year_to }}</td>
        <td class="text-center">{{ education.education_gpa }}</td>
        <td class="text-center">
            <router-link to="#" @click.prevent="$emit('editEducation', education)"><i class="fa fa-edit"></i></router-link>&nbsp;
            <router-link to="#" @click.prevent="$emit('confirmEducationDeletion', education.id)"><i class="fa fa-trash text-danger"></i></router-link>
        </td>
    </tr>    
</template>