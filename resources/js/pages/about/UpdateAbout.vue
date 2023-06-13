<script setup>
    import { ref, onMounted } from 'vue';
    import { Form, Field } from 'vee-validate';
    import * as yup from 'yup';
    import flatpickr from "flatpickr";
    import 'flatpickr/dist/themes/light.css';

    const formValues = ref()
    const form = ref(null)

    const editUserSchema = yup.object({
        name: yup.string().required(),
        job_title: yup.string().required('job title is a required field'),
        job_description: yup.string().required('job description is a required field'),
        place_of_birth: yup.string().required('place of birth is a required field'),
        date_of_birth: yup.string().required('date or birth is a required field'),        
        address: yup.string().required(),
        email: yup.string().email().required(),
        phone: yup.string().required(),
        about_description: yup.string().required('about description is a required field'),
    })

    const handleSubmit = (values, actions) => {
        updateAbout(values, actions)
    }

    const getAbout = async () => {
        await axios.get('/api/about')
        .then((response) => {
            if (response.data.data.length == 0) {
                formValues.value = {                
                    id: 0,
                    name: '',
                    job_title: '',
                    job_description: '',
                    place_of_birth: '',
                    date_of_birth: '',
                    address: '',
                    email: '',
                    phone: '',
                    about_description: '',
                }
            } else {
                formValues.value = {                
                    id: response.data.data[0].id,
                    name: response.data.data[0].name,
                    job_title: response.data.data[0].job_title,
                    job_description: response.data.data[0].job_description,
                    place_of_birth: response.data.data[0].place_of_birth,
                    date_of_birth: response.data.data[0].date_of_birth,
                    address: response.data.data[0].address,
                    email: response.data.data[0].email,
                    phone: response.data.data[0].phone,
                    about_description: response.data.data[0].about_description,
                }
            }            
        })
    }

    const updateAbout = async (values, actions) => {        
        await axios.post('/api/about/' + formValues.value.id, values)
        .then((response) => {
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
        flatpickr(".flatpickr", {
            dateFormat: "Y-m-d",
        })
        getAbout()        
    })
</script>

<template>
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">
                        Edit About
                    </h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item">
                            <router-link to="/admin/dashboard">Home</router-link>
                        </li>
                        <li class="breadcrumb-item">
                            About
                        </li>
                        <li class="breadcrumb-item active">
                            Edit
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    </div>

    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                            <Form ref="form" @submit="handleSubmit" :validation-schema="editUserSchema" v-slot="{ errors }" :initial-values="formValues">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="name">Name</label>
                                            <Field name="name" type="text" class="form-control" id="name" placeholder="Enter Full Name" :class="{ 'is-invalid': errors.name}" />
                                            <span id="errorName" class="invalid-feedback">{{ errors.name }}</span>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="job_title">Job Title</label>
                                            <Field name="job_title" type="text" class="form-control" id="job_title" placeholder="Enter Job Title" :class="{ 'is-invalid': errors.job_title}" />
                                            <span id="errorJobTitle" class="invalid-feedback">{{ errors.job_title }}</span>
                                        </div>                                        
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <label for="job_description">Job Description</label>
                                            <Field name="job_description" as="textarea" class="form-control" cols="30" rows="5" id="job_description" placeholder="Enter Job Description" :class="{ 'is-invalid': errors.job_description}" />
                                            <span id="errorJobDescription" class="invalid-feedback">{{ errors.job_description }}</span>
                                        </div>                                        
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="place_of_birth">Place of Birth</label>
                                            <Field name="place_of_birth" type="text" class="form-control" id="place_of_birth" placeholder="Enter Place of Birth" :class="{ 'is-invalid': errors.place_of_birth}" />
                                            <span id="errorPlaceOfBirth" class="invalid-feedback">{{ errors.place_of_birth }}</span>
                                        </div>                                        
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="date_of_birth">Date of Birth</label>
                                            <Field name="date_of_birth" type="text" class="form-control flatpickr" id="date_of_birth" placeholder="Enter Date of Birth" :class="{ 'is-invalid': errors.date_of_birth}" />
                                            <span id="errorDateOfBirth" class="invalid-feedback">{{ errors.date_of_birth }}</span>
                                        </div>                                        
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <label for="address">Address</label>
                                            <Field name="address" as="textarea" class="form-control" cols="30" rows="5" id="address" placeholder="Enter Address" :class="{ 'is-invalid': errors.address}" />
                                            <span id="errorAddress" class="invalid-feedback">{{ errors.address }}</span>
                                        </div>                                        
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="email">Email</label>
                                            <Field name="email" type="email" class="form-control" id="email" placeholder="Enter Email" :class="{ 'is-invalid': errors.email}" />
                                            <span id="errorEmail" class="invalid-feedback">{{ errors.email }}</span>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="phone">Phone</label>
                                            <Field name="phone" type="text" class="form-control" id="phone" placeholder="Enter Phone" :class="{ 'is-invalid': errors.phone}" />
                                            <span id="errorPhone" class="invalid-feedback">{{ errors.phone }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <label for="about_description">About Description</label>
                                            <Field name="about_description" as="textarea" class="form-control" cols="30" rows="5" id="about_description" placeholder="Enter About Description" :class="{ 'is-invalid': errors.about_description}" />
                                            <span id="errorAboutDescription" class="invalid-feedback">{{ errors.about_description }}</span>
                                        </div>                                        
                                    </div>
                                </div>

                                <button type="submit" class="btn btn-primary">Save</button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>