<script setup>
    import { ref, onMounted, watch } from 'vue';
    import { Form, Field } from 'vee-validate';
    import * as yup from 'yup';
    import { debounce } from 'lodash';
    import { Bootstrap4Pagination } from 'laravel-vue-pagination';

    import EducationListItem from './EducationListItem.vue';

    const educations = ref({
        'data': []
    })
    const editing = ref(false)
    const formValues = ref()
    const form = ref(null)
    const searchQuery = ref(null)
    const selectedEducations = ref([])
    const selectAll = ref(false)
    const educationIdBeingDeleted = ref(null)

    const createEducationSchema = yup.object({
        education_name: yup.string().required('education name is a required field'),
        education_city: yup.string().required('education city is a required field'),
        education_year_from: yup.number('[education year from] must numeric format').required('[education year from] is a required field'),
        education_year_to: yup.number('[education year to] must numeric format').required('[education year to] is a required field'),
        education_gpa: yup.number('GPA to must numeric format').required('GPA is a required field'),
    })

    const editEducationSchema = yup.object({
        education_name: yup.string().required('education name is a required field'),
        education_city: yup.string().required('education city is a required field'),
        education_year_from: yup.number('[education year from] must numeric format').required('[education year from] is a required field'),
        education_year_to: yup.number('[education year to] must numeric format').required('[education year to] is a required field'),
        education_gpa: yup.number('GPA to must numeric format').required('GPA is a required field'),
    })

    const handleSubmit = (values, actions) => {
        if (editing.value) {
            updateEducation(values, actions)
        } else {
            createEducation(values, actions)
        }
    }
    
    const getEducations = async (page = 1) => {
        await axios.get(`/api/educations?page=${page}`, {
            params: {
                query: searchQuery.value
            }
        })
        .then((response) => {
            educations.value = response.data.data
            selectedEducations.value = []
            selectAll.value = false
        })
        .catch((error) => {
            selectedEducations.value = []
            selectAll.value = false
        })
    }    

    const addEducation = () => {
        editing.value = false        
        $('#educationFormModal').modal('show')
        formValues.value = {
            id: '',
            education_name: '',
            education_city: '',
            education_major: '',
            education_year_from: 0,
            education_year_to: 0,
            education_gpa: 0,
        }
    }

    const createEducation = async (values, { resetForm, setErrors }) => {
        await axios.post('/api/educations', values)
        .then((response) => {
            educations.value.data.unshift(response.data.data)
            $('#educationFormModal').modal('hide')
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

    const editEducation = (education) => {
        editing.value = true
        $('#educationFormModal').modal('show')
        formValues.value = {
            id: education.id,
            education_name: education.education_name,
            education_city: education.education_city,
            education_major: education.education_major,
            education_year_from: education.education_year_from,
            education_year_to: education.education_year_to,
            education_gpa: education.education_gpa,
        }
    }

    const updateEducation = async (values, actions) => {
        await axios.post('/api/educations/' + formValues.value.id, values)
        .then((response) => {
            // const index = educations.value.findIndex(education => education.id === response.data.data.id)
            // educations.value[index] = response.data.data
            getEducations()
            $('#educationFormModal').modal('hide')
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
        getEducations()
    }, 300))

    const toggleSelection = (education) => {
        const index = selectedEducations.value.indexOf(education.id)
        if (index === -1) {
            selectedEducations.value.push(education.id)
        } else {
            selectedEducations.value.splice(index, 1)
        }
    }

    const selectAllEducations = () => {
        if (selectAll.value) {
            selectedEducations.value = educations.value.data.map(education => education.id)
        } else {
            selectedEducations.value = []
        }
        console.log(selectedEducations.value)
    }

    const confirmEducationDeletion = (id) => {
        educationIdBeingDeleted.value = id
        $('#deleteEducationModal').modal('show')
    }

    const deleteEducation = (actions) => {
        axios.delete('/api/educations/' + educationIdBeingDeleted.value)
        .then((response) => {
            $('#deleteEducationModal').modal('hide')
            educations.value.data = educations.value.data.filter(education => education.id !== educationIdBeingDeleted.value)
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
        await axios.delete('/api/educations', {
            data: {
                ids: selectedEducations.value
            }
        })
        .then((response) => {
            educations.value.data = educations.value.data.filter(education => !selectedEducations.value.includes(education.id))
            selectedEducations.value = []
            selectAll.value = false
            getEducations()
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
        getEducations()
    })
</script>

<template>
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">List Educations</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><router-link to="/admin/dashboard">Home</router-link></li>
                        <li class="breadcrumb-item active">List Educations</li>
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
                            <button @click="addEducation" type="button" class="btn btn-primary mb-2">
                                <i class="fa fa-plus-circle mr-1"></i> Add New Education
                            </button>
                            <button v-if="selectedEducations.length > 0" @click="bulkDelete" type="button" class="btn btn-danger mb-2 ml-2">
                                <i class="fa fa-trash mr-1"></i> Delete Selected
                            </button>
                            <span v-if="selectedEducations.length > 0" class="ml-2"> 
                                Selected <span class="text-danger">{{ selectedEducations.length }}</span> educations
                            </span>
                        </div>
                        <div>
                            <input v-model="searchQuery" type="text" class="form-control" placeholder="Search..." />
                        </div>
                    </div>
                    <table class="table table-bordered">
                        <thead>
                            <tr class="text-center">
                                <th><input type="checkbox" v-model="selectAll" @change="selectAllEducations" /></th>
                                <th style="width: 10px">#</th>
                                <th>Name</th>
                                <th>City</th>
                                <th>Major</th>
                                <th>Year From</th>
                                <th>Year To</th>
                                <th>GPA</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody v-if="educations.data.length > 0">
                            <EducationListItem v-for="(education, index) in educations.data" 
                                :key="education.id" 
                                :education=education
                                :index=index
                                @edit-education="editEducation"
                                @confirm-education-deletion="confirmEducationDeletion"
                                @toggle-selection="toggleSelection"
                                :select-all="selectAll"
                            />
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="9" class="text-center">
                                    No results found...
                                </td>
                            </tr>
                        </tbody>
                    </table>                    
                </div>
            </div>
            <Bootstrap4Pagination 
                :data="educations"
                @pagination-change-page="getEducations"
            />
        </div>
    </div>

    <div class="modal" id="educationFormModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <span v-if="editing">Edit Existing Education</span>
                        <span v-else>Add New Education</span>                        
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <Form ref="form" @submit="handleSubmit" :validation-schema="editing ? editEducationSchema : createEducationSchema" v-slot="{ errors }" :initial-values="formValues">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="education_name">Name</label>
                            <Field name="education_name" type="text" class="form-control" id="education_name" placeholder="Enter education name" :class="{ 'is-invalid': errors.education_name}" />
                            <span id="errorEducationName" class="invalid-feedback">{{ errors.education_name }}</span>
                        </div>
                        <div class="form-group">
                            <label for="education_city">City</label>
                            <Field name="education_city" type="text" class="form-control" id="education_city" placeholder="Enter education city" :class="{ 'is-invalid': errors.education_city}" />
                            <span id="errorEducationCity" class="invalid-feedback">{{ errors.education_city }}</span>
                        </div>
                        <div class="form-group">
                            <label for="education_major">Major</label>
                            <Field name="education_major" type="text" class="form-control" id="education_major" placeholder="Enter education major" :class="{ 'is-invalid': errors.education_major}" />
                            <span id="errorEducationMajor" class="invalid-feedback">{{ errors.education_major }}</span>
                        </div>
                        <div class="form-group">
                            <label for="education_year_from">Year From</label>
                            <Field name="education_year_from" type="number" class="form-control" id="education_year_from" placeholder="Enter education year from" :class="{ 'is-invalid': errors.education_year_from}" />
                            <span id="errorEducationYearFrom" class="invalid-feedback">{{ errors.education_year_from }}</span>
                        </div>
                        <div class="form-group">
                            <label for="education_year_to">Year To</label>
                            <Field name="education_year_to" type="number" class="form-control" id="education_year_to" placeholder="Enter education year to" :class="{ 'is-invalid': errors.education_year_to}" />
                            <span id="errorEducationYearTo" class="invalid-feedback">{{ errors.education_year_to }}</span>
                        </div>
                        <div class="form-group">
                            <label for="education_gpa">GPA</label>
                            <Field name="education_gpa" type="number" class="form-control" id="education_gpa" placeholder="Enter GPA" :class="{ 'is-invalid': errors.education_gpa}" />
                            <span id="errorGPA" class="invalid-feedback">{{ errors.education_gpa }}</span>
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

    <div class="modal" id="deleteEducationModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <span>Delete Education</span>                        
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h5>Are you sure you want to delete this education ?</h5>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                    <button @click.prevent="deleteEducation" type="button" class="btn btn-danger">Yes</button>
                </div>
            </div>
        </div>
    </div>
</template>