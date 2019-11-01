import requiredAllAuth from '../components/hocs/AllAuth'
import Layout from '../layout'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import ForgotPassword from '../pages/ForgotPassword'

import ResetPassword from '../pages/ResetPassword'
import Position from '../pages/Position'
import Model from '../pages/Model'
import Notfound from '../pages/Notfound'
import Machine from '../pages/Machine'
import Department from '../pages/Department';

import Employee from '../pages/Employee';
import CreateEmployee from '../pages/Employee/CreateEmployee';
import EditEmployee from '../pages/Employee/EditEmployee';
import DetailEmployee from '../pages/Employee/DetailEmployee';

import ViewMachine from '../pages/Machine/ViewMachine';
import CreateNewMachine from '../pages/Machine/CreateNewMachine';
import EditMachine from '../pages/Machine/EditMachine';
import Complain from '../pages/Complain';
import DetailComplain from '../pages/Complain/DetailComplain'
import CreateComplain from '../pages/Complain/CreateComplain'
import EditComplain from '../pages/Complain/EditComplain';
// import SelectTable from '../pages/Ass/SelectTable';
import AssignSchedule from '../pages/AssignSchedule';
import AssignScheduleView from '../pages/AssignSchedule/AssingScheduleView';
import AssignScheduleAccept from '../pages/AssignSchedule/AssignScheduleAccept';

//Schedule
import Schedule from '../pages/Schedule';
import DetailSchedule from '../pages/Schedule/DetailSchedule';
import EditSchedule from '../pages/Schedule/EditSchedule';
import Profile from '../pages/Profile';

//Job 
import Job from '../pages/Job';
// import DetailJob from '../pages/Job/DetailJob';
import jobview from '../pages/Job/jobview';
import DailyReport from '../pages/DailyReport';

//User Management
import AccountCreate from '../pages/AccountCreate'
import CreateAccount from '../pages/AccountCreate/CreateAccount';
import AccView from '../pages/AccountCreate/AccView';
import EditAccView from '../pages/AccountCreate/EditAcc';
import Role from '../pages/Role';
import Module from '../pages/Module';
import CreateModule from '../pages/Module/CreateModule'
import DetailModule from '../pages/Module/DetailModule';
import EditModule from '../pages/Module/EditModule';
//Daily Report Admin View
import DailyReportAdmin from '../pages/DailyReportAdmin'
import DailyReportViewAdmin from '../pages/DailyReportAdmin/dailyreportview';
export default [
    {
        component: Layout,
        routes1: [
            {
                component: requiredAllAuth(Dashboard),
                path: '/',
                exact: true
            },

            //Position Route
            {
                component: requiredAllAuth(Position),
                path: '/positions',
                exact: true
            },
            //Department Route
            {
                component: requiredAllAuth(Department),
                path: '/departments',
                exact: true
            },


            //Employee Route
            {
                component: requiredAllAuth(Employee),
                path: '/employees',
                exact: true
            },
            {
                component: requiredAllAuth(CreateEmployee),
                path: '/employee/create',
                exact: true
            },
            {
                component: requiredAllAuth(DetailEmployee),
                path: '/employees/detail/:id',
                exact: true
            },
            {
                component: requiredAllAuth(EditEmployee),
                path: '/employees/edit/:id',
                exact: true
            },
            //Model Route
            {
                component: requiredAllAuth(Model),
                path: '/models',
                exact: true
            },

            //Machine Route
            {
                component: requiredAllAuth(Machine),
                path: '/machines',
                exact: true,

            },
            {
                component: requiredAllAuth(ViewMachine),
                path: '/machines/detail/:id',
                exact: true
            },
            {
                component: requiredAllAuth(EditMachine),
                path: '/machines/edit/:id',
                exact: true
            },
            {
                component: requiredAllAuth(CreateNewMachine),
                path: '/machines/create',
                exact: true
            },






            //Complain Route
            {
                component: requiredAllAuth(Complain),
                path: '/complains',
                exact: true
            },
            {
                component: requiredAllAuth(DetailComplain),
                path: '/complains/detail/:id',
                exact: true
            },
            {
                component: requiredAllAuth(EditComplain),
                path: '/complains/edit/:id',
                exact: true
            },
            {
                component: requiredAllAuth(CreateComplain),
                path: '/complains/create',
                exact: true
            },

            //AssingScheduleView
            {
                component: requiredAllAuth(AssignSchedule),
                path: '/assingschedule',
                exact: true
            },
            {
                component: requiredAllAuth(AssignScheduleView),
                path: '/assingschedule/detail/:id',
                exact: true
            },
            {
                component: requiredAllAuth(AssignScheduleAccept),
                path: '/assingschedule/accept/:id',
                exact: true
            },

            //Schedule 
            {
                component: requiredAllAuth(Schedule),
                path: '/schedules',
                exact: true
            },

            {
                component: requiredAllAuth(DetailSchedule),
                path: '/schedules/detail/:id',
                exact: true
            },
            {
                component: requiredAllAuth(EditSchedule),
                path: '/schedules/edit/:id',
                exact: true
            },
            //Job
            {
                component: requiredAllAuth(Job),
                path: '/jobs',
                exact: true
            },

            {
                component: requiredAllAuth(jobview),
                path: '/job/jobview/:id',
                exact: true
            },

            //Daily Report
            {
                component: requiredAllAuth(DailyReport),
                path: '/dailyreport',
                exact: true
            },

            //User Mangement

            {
                component: requiredAllAuth(AccountCreate),
                path: '/accounts',
                exact: true
            },
            {
                component: requiredAllAuth(AccView),
                path: '/accounts/detail/:id',
                exact: true
            },
            {
                component: requiredAllAuth(EditAccView),
                path: '/accounts/edit/:id',
                exact: true
            },

            {
                component: requiredAllAuth(CreateAccount),
                path: '/createaccount',
                exact: true
            },

            //Role 
            {
                component: requiredAllAuth(Role),
                path: '/role',
                exact: true
            },

            {
                component: requiredAllAuth(Module),
                path: '/module',
                exact: true
            },
            {
                component: requiredAllAuth(DetailModule),
                path: '/module/detail/:id',
                exact: true
            },
            {
                component: requiredAllAuth(EditModule),
                path: '/module/edit/:id',
                exact: true
            },
            {
                component: requiredAllAuth(CreateModule),
                path: '/module/create',
                exact: true
            },

            //Daily Report Admin 
            {
                component: requiredAllAuth(DailyReportAdmin),
                path: '/report',
                exact: true
            },
            {
                component: requiredAllAuth(DailyReportViewAdmin),
                path: '/report/view/:id',
                exact: true
            },
            //Profile 
            {
                component: requiredAllAuth(Profile),
                path: '/profile',
                exact: true
            },
            {
                component: Login,
                path: '/login',
            },

            {
                component: ForgotPassword,
                path: '/forgotPassword',
            },

            {
                component: ResetPassword,
                path: '/reset/:token',
            },


            {
                component: Notfound
            }
        ]
    }
]