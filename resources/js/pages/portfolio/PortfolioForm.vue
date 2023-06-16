<script setup>
    import { reactive, onMounted, ref } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { Form } from 'vee-validate';

    const form = reactive({
        project_name: '',
        portfolio_category_id: '',
        project_year: '',
        project_url: '',
        project_description: '',
    })
    const route = useRoute()
    const router = useRouter()
    const portfolio_categories = ref()
    const editMode = ref(false)

    const getPortfolioCategory = async (actions) => {
        await axios.get('/api/portfolios/categories/all')
        .then((response) => {        
            portfolio_categories.value = response.data.data
        })
        .catch((error) => {
            actions.setErrors(error.response.data.message)
        })
    }

    const handleSubmit = async (values, actions) => {
        if (editMode.value) {
            updatePortfolio(values, actions)
        } else {
            createPortfolio(values, actions)
        }
    }

    const createPortfolio = async (values, actions) => {
        await axios.post('/api/portfolios', form)
        .then((response) => {                
            router.push('/admin/portfolios')
            Toast.fire({
                icon: 'success',
                title: response.data.message
            })
        })
        .catch((error) => {
            actions.setErrors(error.response.data.message)
        })
    }

    const updatePortfolio = async (values, actions) => {
        await axios.post(`/api/portfolios/${route.params.id}`, form)
        .then((response) => {                
            router.push('/admin/portfolios')
            Toast.fire({
                icon: 'success',
                title: response.data.message
            })
        })
        .catch((error) => {
            actions.setErrors(error.response.data.message)
        })
    }

    const getPortfolio = async (actions) => {
        await axios.get(`/api/portfolios/${route.params.id}`)
        .then((response) => {       
            form.project_name = response.data.data.project_name
            form.portfolio_category_id = response.data.data.portfolio_category_id
            form.project_year = response.data.data.project_year
            form.project_url = response.data.data.project_url
            form.project_description = response.data.data.project_description
        })
        .catch((error) => {
            actions.setErrors(error.response.data.message)
        })
    }

    onMounted(() => {
        if (route.name === 'admin.portfolios.edit') {
            editMode.value = true
            getPortfolio()
        }
        getPortfolioCategory()
    })
</script>

<template>
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">
                        <span v-if="editMode">Edit</span>
                        <span v-else>Create</span>
                        Portfolio
                    </h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item">
                            <router-link to="/admin/dashboard">Home</router-link>
                        </li>
                        <li class="breadcrumb-item">
                            <router-link to="/admin/portfolios">Appointments</router-link>
                        </li>
                        <li class="breadcrumb-item active">
                            <span v-if="editMode">Edit</span>
                            <span v-else>Create</span>
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
                            <Form @submit="handleSubmit" v-slot:default="{ errors }">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="project_name">Project Name</label>
                                            <input v-model="form.project_name" type="text" class="form-control" name="project_name" id="project_name" placeholder="Enter project name" :class="{ 'is-invalid': errors.project_name}">
                                            <span id="errorProjectName" class="invalid-feedback">{{ errors.project_name }}</span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="portfolio_category">Category</label>
                                            <select v-model="form.portfolio_category_id" id="portfolio_category" class="form-control" :class="{ 'is-invalid': errors.portfolio_category_id}">
                                                <option v-for="portfolio_category in portfolio_categories" :key="portfolio_category.id" :value="portfolio_category.id">{{ portfolio_category.category_name }}</option>
                                            </select>
                                            <span id="errorPortfolioCategory" class="invalid-feedback">{{ errors.portfolio_category_id }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="project_year">Year</label>
                                            <input v-model="form.project_year" type="number" class="form-control" name="project_year" id="project_year" placeholder="Enter project year" :class="{ 'is-invalid': errors.project_year}">
                                            <span id="errorProjectYear" class="invalid-feedback">{{ errors.project_year }}</span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="project_url">URL</label>
                                            <input v-model="form.project_url" type="text" class="form-control" name="project_url" id="project_url" placeholder="Enter project URL" :class="{ 'is-invalid': errors.project_url}">
                                            <span id="errorProjectURL" class="invalid-feedback">{{ errors.project_url }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="project_description">Project Description</label>
                                            <textarea v-model="form.project_description" type="text" class="form-control" cols="30" rows="2" name="project_description" id="project_description" placeholder="Enter project description" :class="{ 'is-invalid': errors.project_description}"></textarea>
                                            <span id="errorProjectDescription" class="invalid-feedback">{{ errors.project_description }}</span>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>