<script setup>
    import { ref, onMounted, watch } from 'vue';
    import { Form, Field } from 'vee-validate';
    import * as yup from 'yup';
    import { debounce } from 'lodash';
    import { Bootstrap4Pagination } from 'laravel-vue-pagination';

    import SkillListItem from './SkillListItem.vue';

    const skills = ref({
        'data': []
    })
    const editing = ref(false)
    const formValues = ref()
    const form = ref(null)
    const searchQuery = ref(null)
    const selectedSkills = ref([])
    const selectAll = ref(false)
    const skillIdBeingDeleted = ref(null)

    const createSkillSchema = yup.object({
        skill_name: yup.string().required('skill name is a required field'),
        skill_experience: yup.number('skill experience must numeric format').required('skill experience is a required field'),
    })

    const editSkillSchema = yup.object({
        skill_name: yup.string().required('skill name is a required field'),
        skill_experience: yup.number('skill experience must numeric format').required('skill experience is a required field'),
    })

    const handleSubmit = (values, actions) => {
        if (editing.value) {
            updateSkill(values, actions)
        } else {
            createSkill(values, actions)
        }
    }
    
    const getSkills = async (page = 1) => {
        await axios.get(`/api/skills?page=${page}`, {
            params: {
                query: searchQuery.value
            }
        })
        .then((response) => {
            skills.value = response.data.data
            selectedSkills.value = []
            selectAll.value = false
        })
        .catch((error) => {
            selectedSkills.value = []
            selectAll.value = false
        })
    }    

    const addSkill = () => {
        editing.value = false        
        $('#skillFormModal').modal('show')
        formValues.value = {
            id: '',
            skill_name: '',
            skill_experience: 0,
        }
    }

    const createSkill = async (values, { resetForm, setErrors }) => {
        await axios.post('/api/skills', values)
        .then((response) => {
            skills.value.data.unshift(response.data.data)
            $('#skillFormModal').modal('hide')
            resetForm()
            Toast.fire({
                icon: 'success',
                title: response.data.message
            })
        })
        .catch((error) => {
            if (error.response.data.message) {
                setErrors(error.response.data.message)
            }
        })
    }

    const editSkill = (skill) => {
        editing.value = true
        $('#skillFormModal').modal('show')
        formValues.value = {
            id: skill.id,
            skill_name: skill.skill_name,
            skill_experience: skill.skill_experience,
        }
    }

    const updateSkill = async (values, actions) => {
        await axios.post('/api/skills/' + formValues.value.id, values)
        .then((response) => {
            // const index = skills.value.findIndex(skill => skill.id === response.data.data.id)
            // skills.value[index] = response.data.data
            getSkills()
            $('#skillFormModal').modal('hide')
            Toast.fire({
                icon: 'success',
                title: response.data.message
            })            
        })
        .catch((error) => {
            actions.setErrors(error.response.data.message)
        })
    }

    watch(searchQuery, debounce(() => {
        getSkills()
    }, 300))

    const toggleSelection = (skill) => {
        const index = selectedSkills.value.indexOf(skill.id)
        if (index === -1) {
            selectedSkills.value.push(skill.id)
        } else {
            selectedSkills.value.splice(index, 1)
        }
    }

    const selectAllSkills = () => {
        if (selectAll.value) {
            selectedSkills.value = skills.value.data.map(skill => skill.id)
        } else {
            selectedSkills.value = []
        }
        console.log(selectedSkills.value)
    }

    const confirmSkillDeletion = (id) => {
        skillIdBeingDeleted.value = id
        $('#deleteSkillModal').modal('show')
    }

    const deleteSkill = (actions) => {
        axios.delete('/api/skills/' + skillIdBeingDeleted.value)
        .then((response) => {
            $('#deleteSkillModal').modal('hide')
            skills.value.data = skills.value.data.filter(skill => skill.id !== skillIdBeingDeleted.value)
            Toast.fire({
                icon: 'success',
                title: response.data.message
            })
        })
        .catch((error) => {
            actions.setErrors(error.response.data.message)
        })
    }

    const bulkDelete = async (actions) => {
        await axios.delete('/api/skills', {
            data: {
                ids: selectedSkills.value
            }
        })
        .then((response) => {
            skills.value.data = skills.value.data.filter(skill => !selectedSkills.value.includes(skill.id))
            selectedSkills.value = []
            selectAll.value = false
            getSkills()
            Toast.fire({
                icon: 'success',
                title: response.data.message
            })
        })
        .catch((error) => {
            actions.setErrors(error.response.data.message)
        })
    }
    
    onMounted(() => {
        getSkills()
    })
</script>

<template>
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">List Skills</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><router-link to="/admin/dashboard">Home</router-link></li>
                        <li class="breadcrumb-item active">List Skills</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>

    <div class="content">
        <div class="container-fluid">            
            <div class="card">                
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <div>
                            <button @click="addSkill" type="button" class="btn btn-primary mb-2">
                                <i class="fa fa-plus-circle mr-1"></i> Add New Skill
                            </button>
                            <button v-if="selectedSkills.length > 0" @click="bulkDelete" type="button" class="btn btn-danger mb-2 ml-2">
                                <i class="fa fa-trash mr-1"></i> Delete Selected
                            </button>
                            <span v-if="selectedSkills.length > 0" class="ml-2"> 
                                Selected <span class="text-danger">{{ selectedSkills.length }}</span> skills
                            </span>
                        </div>
                        <div>
                            <input v-model="searchQuery" type="text" class="form-control" placeholder="Search..." />
                        </div>
                    </div>
                    <table class="table table-bordered">
                        <thead>
                            <tr class="text-center">
                                <th><input type="checkbox" v-model="selectAll" @change="selectAllSkills" /></th>
                                <th style="width: 10px">#</th>
                                <th>Skill Name</th>
                                <th>Skill Experience (in year)</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody v-if="skills.data.length > 0">
                            <SkillListItem v-for="(skill, index) in skills.data" 
                                :key="skill.id" 
                                :skill=skill
                                :index=index
                                @edit-skill="editSkill"
                                @confirm-skill-deletion="confirmSkillDeletion"
                                @toggle-selection="toggleSelection"
                                :select-all="selectAll"
                            />
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="6" class="text-center">
                                    No results found...
                                </td>
                            </tr>
                        </tbody>
                    </table>                    
                </div>
            </div>
            <Bootstrap4Pagination 
                :data="skills"
                @pagination-change-page="getSkills"
            />
        </div>
    </div>

    <div class="modal" id="skillFormModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <span v-if="editing">Edit Existing Skill</span>
                        <span v-else>Add New Skill</span>                        
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <Form ref="form" @submit="handleSubmit" :validation-schema="editing ? editSkillSchema : createSkillSchema" v-slot="{ errors }" :initial-values="formValues">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="skill_name">Skill Name</label>
                            <Field name="skill_name" type="text" class="form-control" id="skill_name" placeholder="Enter skill name" :class="{ 'is-invalid': errors.skill_name}" />
                            <span id="errorSkillName" class="invalid-feedback">{{ errors.skill_name }}</span>
                        </div>
                        <div class="form-group">
                            <label for="skill_experience">Skill Experience (in year)</label>
                            <Field name="skill_experience" type="number" class="form-control" id="email" placeholder="Enter skill experience" :class="{ 'is-invalid': errors.skill_experience}" />
                            <span id="errorSkillExperience" class="invalid-feedback">{{ errors.skill_experience }}</span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal" id="deleteSkillModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <span>Delete Skill</span>                        
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h5>Are you sure you want to delete this skill ?</h5>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                    <button @click.prevent="deleteSkill" type="button" class="btn btn-danger">Yes</button>
                </div>
            </div>
        </div>
    </div>
</template>