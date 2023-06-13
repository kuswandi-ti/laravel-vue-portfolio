import { createRouter, createWebHistory } from "vue-router";

import Dashboard from '../components/Dashboard.vue';

import Login from '../pages/auth/Login.vue';
import Register from '../pages/auth/Register.vue';

import ListAppointments from '../pages/appointments/ListAppointments.vue';
import AppointmentForm from '../pages/appointments/AppointmentForm.vue';
import UserList from '../pages/users/UserList.vue';
import UpdateSetting from '../pages/settings/UpdateSetting.vue';
import UpdateProfile from '../pages/profile/UpdateProfile.vue';

import UpdateAbout from '../pages/about/UpdateAbout.vue';
import SkillList from '../pages/skill/SkillList.vue';

export const routes = [
    {        
        path: '/login',
        name: 'admin.login',
        component: Login,
    },
    {        
        path: '/register',
        name: 'admin.register',
        component: Register,
    },
    {        
        path: '/admin/dashboard',
        name: 'admin.dashboard',
        component: Dashboard,
    },
    {        
        path: '/admin/appointments',
        name: 'admin.appointments',
        component: ListAppointments,
    },
    {        
        path: '/admin/appointments/create',
        name: 'admin.appointments.create',
        component: AppointmentForm,
    },
    {        
        path: '/admin/appointments/:id',
        name: 'admin.appointments.edit',
        component: AppointmentForm,
    },
    {        
        path: '/admin/users',
        name: 'admin.users',
        component: UserList,
    },
    {        
        path: '/admin/settings',
        name: 'admin.settings',
        component: UpdateSetting,
    },
    {        
        path: '/admin/profile',
        name: 'admin.profile',
        component: UpdateProfile,
    },
    {        
        path: '/admin/about',
        name: 'admin.about',
        component: UpdateAbout,
    },
    {        
        path: '/admin/skills',
        name: 'admin.skills',
        component: SkillList,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router