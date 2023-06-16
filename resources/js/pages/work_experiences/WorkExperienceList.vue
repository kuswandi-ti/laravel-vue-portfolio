<script setup>
    import { ref, onMounted, watch } from 'vue';
    import { Form, Field } from 'vee-validate';
    import * as yup from 'yup';
    import { debounce } from 'lodash';
    import { Bootstrap4Pagination } from 'laravel-vue-pagination';

    import WorkExperienceListItem from './WorkExperienceListItem.vue';

    const wes = ref({
        'data': []
    })
    const editing = ref(false)
    const formValues = ref()
    const form = ref(null)
    const searchQuery = ref(null)
    const selectedWes = ref([])
    const selectAll = ref(false)
    const weIdBeingDeleted = ref(null)

    const createWeSchema = yup.object({
        we_name: yup.string().required('work experience name is a required field'),
        we_city: yup.string().required('work experience city is a required field'),
        we_year_from: yup.number('[work experience year from] must numeric format').required('[work experience year from] is a required field'),
        we_year_to: yup.number('[work experience year to] must numeric format').required('[work experience year to] is a required field'),
        we_position: yup.string().required('work experience position is a required field'),
        we_job_description: yup.string().required('work experience job description is a required field'),
        we_reason_to_leave: yup.string().required('work experience reason to leave is a required field'),
    })

    const editWeSchema = yup.object({
        we_name: yup.string().required('work experience name is a required field'),
        we_city: yup.string().required('work experience city is a required field'),
        we_year_from: yup.number('[work experience year from] must numeric format').required('[work experience year from] is a required field'),
        we_year_to: yup.number('[work experience year to] must numeric format').required('[work experience year to] is a required field'),
        we_position: yup.string().required('work experience position is a required field'),
        we_job_description: yup.string().required('work experience job description is a required field'),
        we_reason_to_leave: yup.string().required('work experience reason to leave is a required field'),
    })

    const handleSubmit = (values, actions) => {
        if (editing.value) {
            updateWe(values, actions)
        } else {
            createWe(values, actions)
        }
    }
    
    const getWes = async (page = 1) => {
        await axios.get(`/api/work_experiences?page=${page}`, {
            params: {
                query: searchQuery.value
            }
        })
        .then((response) => {
            wes.value = response.data.data
            selectedWes.value = []
            selectAll.value = false
        })
        .catch((error) => {
            selectedWes.value = []
            selectAll.value = false
        })
    }    

    const addWe = () => {
        editing.value = false        
        $('#weFormModal').modal('show')
        formValues.value = {
            id: '',
            we_name: '',
            we_city: '',
            we_year_from: 0,
            we_year_to: 0, 
            we_position: '',
            we_job_description: '',
            we_reason_to_leave: '',
        }
    }

    const createWe = async (values, { resetForm, setErrors }) => {
        await axios.post('/api/work_experiences', values)
        .then((response) => {
            wes.value.data.unshift(response.data.data)
            $('#weFormModal').modal('hide')
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

    const editWe = (we) => {
        editing.value = true
        $('#weFormModal').modal('show')
        formValues.value = {
            id: we.id,
            we_name: we.work_experience_name,
            we_city: we.work_experience_city,
            we_year_from: we.work_experience_year_from,
            we_year_to: we.work_experience_year_to, 
            we_position: we.work_experience_position,
            we_job_description: we.work_experience_job_description,
            we_reason_to_leave: we.work_experience_reason_to_leave,
        }
    }

    const updateWe = async (values, actions) => {
        await axios.post('/api/work_experiences/' + formValues.value.id, values)
        .then((response) => {
            // const index = wes.value.findIndex(we => we.id === response.data.data.id)
            // wes.value[index] = response.data.data
            getWes()
            $('#weFormModal').modal('hide')
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
        getWes()
    }, 300))

    const toggleSelection = (we) => {
        const index = selectedWes.value.indexOf(we.id)
        if (index === -1) {
            selectedWes.value.push(we.id)
        } else {
            selectedWes.value.splice(index, 1)
        }
    }

    const selectAllWes = () => {
        if (selectAll.value) {
            selectedWes.value = wes.value.data.map(we => we.id)
        } else {
            selectedWes.value = []
        }
        console.log(selectedWes.value)
    }

    const confirmWeDeletion = (id) => {
        weIdBeingDeleted.value = id
        $('#deleteWeModal').modal('show')
    }

    const deleteWe = (actions) => {
        axios.delete('/api/work_experiences/' + weIdBeingDeleted.value)
        .then((response) => {
            $('#deleteWeModal').modal('hide')
            wes.value.data = wes.value.data.filter(we => we.id !== weIdBeingDeleted.value)
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
        await axios.delete('/api/work_experiences', {
            data: {
                ids: selectedWes.value
            }
        })
        .then((response) => {
            wes.value.data = wes.value.data.filter(we => !selectedWes.value.includes(we.id))
            selectedWes.value = []
            selectAll.value = false
            getWes()
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
        getWes()
    })
</script>

<template>
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">List Work Experience</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><router-link to="/admin/dashboard">Home</router-link></li>
                        <li class="breadcrumb-item active">List Work Experience</li>
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
                            <button @click="addWe" type="button" class="btn btn-primary mb-2">
                                <i class="fa fa-plus-circle mr-1"></i> Add New Work Experience
                            </button>
                            <button v-if="selectedWes.length > 0" @click="bulkDelete" type="button" class="btn btn-danger mb-2 ml-2">
                                <i class="fa fa-trash mr-1"></i> Delete Selected
                            </button>
                            <span v-if="selectedWes.length > 0" class="ml-2"> 
                                Selected <span class="text-danger">{{ selectedWes.length }}</span> work experiences
                            </span>
                        </div>
                        <div>
                            <input v-model="searchQuery" type="text" class="form-control" placeholder="Search..." />
                        </div>
                    </div>
                    <table class="table table-bordered">
                        <thead>
                            <tr class="text-center">
                                <th><input type="checkbox" v-model="selectAll" @change="selectAllWes" /></th>
                                <th style="width: 10px">#</th>
                                <th>Name</th>
                                <th>City</th>
                                <th>Year From</th>
                                <th>Year To</th>
                                <th>Position</th>
                                <th>Job Description</th>
                                <th>Reason to Leave</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody v-if="wes.data.length > 0">
                            <WorkExperienceListItem v-for="(we, index) in wes.data" 
                                :key="we.id" 
                                :we=we
                                :index=index
                                @edit-we="editWe"
                                @confirm-we-deletion="confirmWeDeletion"
                                @toggle-selection="toggleSelection"
                                :select-all="selectAll"
                            />
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="10" class="text-center">
                                    No results found...
                                </td>
                            </tr>
                        </tbody>
                    </table>                    
                </div>
            </div>
            <Bootstrap4Pagination 
                :data="wes"
                @pagination-change-page="getWes"
            />
        </div>
    </div>

    <div class="modal" id="weFormModal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <span v-if="editing">Edit Existing Work Experience</span>
                        <span v-else>Add New Work Experience</span>                        
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <Form ref="form" @submit="handleSubmit" :validation-schema="editing ? editWeSchema : createWeSchema" v-slot="{ errors }" :initial-values="formValues">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="we_name">Name</label>
                            <Field name="we_name" type="text" class="form-control" id="we_name" placeholder="Enter name" :class="{ 'is-invalid': errors.we_name}" />
                            <span id="errorWeName" class="invalid-feedback">{{ errors.we_name }}</span>
                        </div>
                        <div class="form-group">
                            <label for="we_city">City</label>
                            <Field name="we_city" type="text" class="form-control" id="we_city" placeholder="Enter city" :class="{ 'is-invalid': errors.we_city}" />
                            <span id="errorWeCity" class="invalid-feedback">{{ errors.we_city }}</span>
                        </div>                        
                        <div class="form-group">
                            <label for="we_year_from">Year From</label>
                            <Field name="we_year_from" type="number" class="form-control" id="we_year_from" placeholder="Enter year from" :class="{ 'is-invalid': errors.we_year_from}" />
                            <span id="errorWeYearFrom" class="invalid-feedback">{{ errors.we_year_from }}</span>
                        </div>
                        <div class="form-group">
                            <label for="we_year_to">Year To</label>
                            <Field name="we_year_to" type="number" class="form-control" id="we_year_to" placeholder="Enter year to" :class="{ 'is-invalid': errors.we_year_to}" />
                            <span id="errorWeYearTo" class="invalid-feedback">{{ errors.we_year_to }}</span>
                        </div>
                        <div class="form-group">
                            <label for="we_position">Position</label>
                            <Field name="we_position" type="text" class="form-control" id="we_position" placeholder="Enter position" :class="{ 'is-invalid': errors.we_position}" />
                            <span id="errorWePosition" class="invalid-feedback">{{ errors.we_position }}</span>
                        </div>
                        <div class="form-group">
                            <label for="we_job_description">Job Description</label>
                            <Field name="we_job_description" as="textarea" class="form-control" cols="30" rows="3" id="we_job_description" placeholder="Enter job description" :class="{ 'is-invalid': errors.we_job_description}" />
                            <span id="errorWeJobDescription" class="invalid-feedback">{{ errors.we_job_description }}</span>
                        </div>
                        <div class="form-group">
                            <label for="we_reason_to_leave">Reason to Leave</label>
                            <Field name="we_reason_to_leave" as="textarea" class="form-control" cols="30" rows="3" id="we_reason_to_leave" placeholder="Enter reason to leave" :class="{ 'is-invalid': errors.we_reason_to_leave}" />
                            <span id="errorWeReasonToLeave" class="invalid-feedback">{{ errors.we_reason_to_leave }}</span>
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

    <div class="modal" id="deleteWeModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <span>Delete Work Experience</span>                        
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h5>Are you sure you want to delete this work experience ?</h5>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                    <button @click.prevent="deleteWe" type="button" class="btn btn-danger">Yes</button>
                </div>
            </div>
        </div>
    </div>
</template>