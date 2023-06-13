import { createRouter, createWebHistory } from "vue-router";

import Dashboard from '../components/Dashboard.vue';

import Login from '../pages/auth/Login.vue';

import UpdateAbout from '../pages/about/UpdateAbout.vue';
import SkillList from '../pages/skill/SkillList.vue';
import EducationList from '../pages/education/EducationList.vue';

export const routes = [
    {        
        path: '/login',
        name: 'admin.login',
        component: Login,
    },
    {        
        path: '/admin/dashboard',
        name: 'admin.dashboard',
        component: Dashboard,
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
    {        
        path: '/admin/educations',
        name: 'admin.educations',
        component: EducationList,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router