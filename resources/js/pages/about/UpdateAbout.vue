<script setup>
    import { ref, onMounted } from 'vue';
    import { Form, Field } from 'vee-validate';
    import * as yup from 'yup';
    import flatpickr from "flatpickr";
    import 'flatpickr/dist/themes/light.css';

    const formValues = ref()
    let path_photo = '';
    let path_cv = '';

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
                    photo: '',
                    cv: '',
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
                    photo: response.data.data[0].photo,
                    cv: response.data.data[0].cv,
                }
            }

            path_photo = formValues._value.photo
            path_cv = formValues._value.cv
        })
    }

    const updateAbout = async (values, actions) => {
        const formData = new FormData();
        formData.append('id', values.id);
        formData.append('name', values.name);
        formData.append('job_title', values.job_title);
        formData.append('job_description', values.job_description);
        formData.append('place_of_birth', values.place_of_birth);
        formData.append('date_of_birth', values.date_of_birth);
        formData.append('address', values.address);
        formData.append('email', values.email);
        formData.append('phone', values.phone);
        formData.append('about_description', values.about_description);
        formData.append('photo', values.photo);
        formData.append('cv', values.cv);

        await axios.post('/api/about/' + formValues.value.id, formData)
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

    const getPhoto = () => {
        let photo = '/img/avatar.jpg'
                
        if (formValues.photo) {
            if (formValues.photo.indexOf('base64') != -1) {
                photo = formValues.photo
            } else {
                photo = path_photo
            }
        } else {
            photo = path_photo
        }
        
        return photo        
    }

    const onFileChangePhoto = (e) => {
        // formValues.value.photo = e.target.files[0]
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onloadend = (file) => {
            formValues.photo = reader.result
            console.log(formValues.photo)
        }
        reader.readAsDataURL(file)
    };

    const onFileChangeCv = (e) => {
        formValues.value.cv = e.target.files[0]
    };

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
                        About
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
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="name">Name</label>
                                            <Field name="name" id="name" type="text" class="form-control" placeholder="Enter Full Name" :class="{'is-invalid': errors.name}" />
                                            <span id="errorName" class="invalid-feedback">{{ errors.name }}</span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="job_title">Job Title</label>
                                            <Field name="job_title" id="job_title" type="text" class="form-control" placeholder="Enter Job Title" :class="{'is-invalid': errors.job_title}" />
                                            <span id="errorJobTitle" class="invalid-feedback">{{ errors.job_title }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="job_description">Job Description</label>
                                            <Field name="job_description" id="job_description" as="textarea" class="form-control" cols="30" rows="2" placeholder="Enter Job Description" :class="{'is-invalid': errors.job_description}" />
                                            <span id="errorJobDescription" class="invalid-feedback">{{ errors.job_description }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="place_of_birth">Place of Birth</label>
                                            <Field name="place_of_birth" id="place_of_birth" type="text" class="form-control" placeholder="Enter Place of Birth" :class="{'is-invalid': errors.place_of_birth}" />
                                            <span id="errorPlaceOfBirth" class="invalid-feedback">{{ errors.place_of_birth }}</span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="date_of_birth">Date of Birth</label>
                                            <Field name="date_of_birth" id="date_of_birth" type="text" class="form-control flatpickr" placeholder="Enter Date of Birth" :class="{'is-invalid': errors.date_of_birth}" />
                                            <span id="errorDateOfBirth" class="invalid-feedback">{{ errors.date_of_birth }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="address">Address</label>
                                            <Field name="address" id="address" as="textarea" class="form-control" cols="30" rows="2" placeholder="Enter Address" :class="{'is-invalid': errors.address}" />
                                            <span id="errorAddress" class="invalid-feedback">{{ errors.address }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="email">Email</label>
                                            <Field name="email" id="email" type="email" class="form-control" placeholder="Enter Email" :class="{'is-invalid': errors.email}" />
                                            <span id="errorEmail" class="invalid-feedback">{{ errors.email }}</span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="phone">Phone (+62 format)</label>
                                            <Field name="phone" id="phone" type="text" class="form-control" placeholder="Enter Phone" :class="{'is-invalid': errors.phone}" />
                                            <span id="errorPhone" class="invalid-feedback">{{ errors.phone }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="about_description">About Description</label>
                                            <Field name="about_description" id="about_description" as="textarea" class="form-control" cols="30" rows="2" placeholder="Enter About Description" :class="{'is-invalid': errors.about_description}" />
                                            <span id="errorAboutDescription" class="invalid-feedback">{{ errors.about_description }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="name">Upload Photo </label>
                                            <Field name="photo" id="photo" as="file" class="form-control">
                                                <input type="file" id="fileimg" @change="onFileChangePhoto" />
                                            </Field>
                                            <div class="text-center">
                                                <img class="profile-user-img img-fluid img-circle mt-5" :src="getPhoto()" style="width: 200px; height: 200px;">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="cv">Upload CV</label>
                                            <Field name="cv" id="cv" as="file" class="form-control">
                                                <input type="file" @change="onFileChangeCv" />
                                            </Field>
                                            <span v-if="path_cv">
                                                <a :href="path_cv" target="_blank">View File</a>
                                            </span>
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
