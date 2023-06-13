<script setup>
    const emit = defineEmits(['skillDeleted', 'editSkill', 'confirmSkillDeletion'])

    const props = defineProps({
        skill: Object,
        index: Number,
        selectAll: Boolean
    })

    const toggleSelection = () => {
        emit('toggleSelection', props.skill)
    }
</script>

<template>
    <tr>
        <th class="text-center"><input type="checkbox" :checked="selectAll" @change="toggleSelection" /></th>
        <td class="text-center">{{ index + 1 }}</td>
        <td>{{ skill.skill_name }}</td>
        <td class="text-center">{{ skill.skill_experience }}</td>
        <td class="text-center">
            <router-link to="#" @click.prevent="$emit('editSkill', skill)"><i class="fa fa-edit"></i></router-link>&nbsp;
            <router-link to="#" @click.prevent="$emit('confirmSkillDeletion', skill.id)"><i class="fa fa-trash text-danger"></i></router-link>
        </td>
    </tr>    
</template>