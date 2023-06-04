import routeConfig from '../config/routes';
//Lyaouts
import HeaderOnly from '../layout/headerOnly';

//Pages
import DashBoard from '../pages/DashBoard';
import Home from '../pages/Home';
import ReduxExample from '../pages/ReduxExample';
import Register from '../pages/Register';
import Category from '../pages/Category/category';
import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';
import DashboardAdmin from '../components/Admin/DashboardManagement/DashBoardManagement';
import ListNewspaper from '../pages/Managerment/NewspaperManagement/listNewspaper';
import ListUser from '../pages/Managerment/UserManagement/listUser';
import EditNewspaper from '../pages/Managerment/NewspaperManagement/editNewspaper';
import EditUser from '../pages/Managerment/UserManagement/editUser';
import AddUser from '../pages/Managerment/UserManagement/addUser';


//Public Route
export const publicRoutes = [
    { path: routeConfig.dashboard, component: DashBoard },
    { path: routeConfig.home, component: Home },
    { path: routeConfig.reduxexamples, component: ReduxExample, layout: HeaderOnly },
    { path: routeConfig.register, component: Register, layout: HeaderOnly },
    { path: routeConfig.listNewByCategory, component: Category },
    { path: routeConfig.signin, component: SignIn, layout: HeaderOnly  },
    { path: routeConfig.signup, component: SignUp, layout: HeaderOnly  },

    //admin routes
    // { path: routeConfig.adminDashboard, component: Dashboard, layout: HeaderOnly},
    { path: routeConfig.newspaperManagement, component:  ListNewspaper, layout: DashboardAdmin},
    { path: routeConfig.editNewspaper, component: EditNewspaper, layout: DashboardAdmin},
    { path: routeConfig.userManagement, component:  ListUser, layout: DashboardAdmin},
    { path: routeConfig.editUser, component: EditUser, layout: DashboardAdmin},
    { path: routeConfig.addUser, component: AddUser, layout: DashboardAdmin},
    { path: routeConfig.commentManagement, component:  ListNewspaper, layout: DashboardAdmin},
    { path: '/', component: Home },

];
export const privateRoutes = [];
