<script setup>
    import { ref, onMounted, computed } from 'vue';
    import Swal from 'sweetalert2';
    import { Bootstrap4Pagination } from 'laravel-vue-pagination';

    const portfolios = ref({
        'data': []
    })
    const searchQuery = ref(null)

    const getPortfolios = async (page = 1) => {
        await axios.get(`/api/portfolios?page=${page}`, {
            params: {
                query: searchQuery.value
            }
        })
        .then((response) => {
            portfolios.value = response.data.data
        })
    }

    const deletePortfolio = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/portfolios/${id}`)
                .then((response) => {
                    portfolios.value.data = portfolios.value.data.filter(portfolio => portfolio.id !== id)
                    Swal.fire(
                        'Deleted!',
                        response.data.message,
                        'success'
                    )
                })
                .catch((error) => {
                    errors.value = error.response.data;
                })                
            }
        })
    }

    onMounted(() => {
        getPortfolios()
    })
</script>

<template>
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">List Portfolios</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><router-link to="/admin/dashboard">Home</router-link></li>
                        <li class="breadcrumb-item active">List Portfolios</li>
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
                            <div class="d-flex justify-content-between mb-2">
                                <div>
                                    <router-link to="/admin/portfolios/create">
                                        <button class="btn btn-primary"><i class="fa fa-plus-circle mr-1"></i> 
                                            Add New Portfolio
                                        </button>
                                    </router-link>
                                </div>                                
                            </div>
                            <table class="table table-bordered">
                                <thead>
                                    <tr class="text-center">
                                        <th scope="col">#</th>
                                        <th scope="col">Project Name</th>
                                        <th scope="col">Project Category</th>
                                        <th scope="col">Project Year</th>
                                        <th scope="col">Project URL</th>
                                        <th scope="col">Project Description</th>
                                        <th scope="col">Options</th>
                                    </tr>
                                </thead>
                                <tbody v-if="portfolios.data.length > 0">
                                    <tr v-for="(portfolio, index) in portfolios.data" :key="portfolio.id">
                                        <td class="text-center">{{ index + 1 }}</td>
                                        <td>{{ portfolio.project_name }}</td>
                                        <td class="text-center">{{ portfolio.portfolio_category.category_name }}</td>
                                        <td class="text-center">{{ portfolio.project_year }}</td>
                                        <td>{{ portfolio.project_url }}</td>
                                        <td>{{ portfolio.project_description }}</td>
                                        <td class="text-center">
                                            <router-link :to="`/admin/portfolios/${portfolio.id}`">
                                                <i class="fa fa-edit mr-2"></i>
                                            </router-link>
                                            <a href="#" @click.prevent="deletePortfolio(portfolio.id)">
                                                <i class="fa fa-trash text-danger"></i>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="7" class="text-center">
                                            No results found...
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Bootstrap4Pagination 
                        :data="portfolios"
                        @pagination-change-page="getPortfolios"
                    />
                </div>
            </div>
        </div>
    </div>
</template>