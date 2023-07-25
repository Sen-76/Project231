import routeConfig from '../config/routes';
//Lyaouts
import HeaderOnly from '../layout/headerOnly';

//Pages
import DashBoard from '../pages/DashBoard';
import Home from '../pages/Home';
import ReduxExample from '../pages/ReduxExample';
import Category from '../pages/Category/category';
import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';
import Forgot from '../pages/Forgot/Forgot';
import DashboardAdmin from '../components/Admin/DashboardManagement/DashBoardManagement';
import ListNewspaper from '../pages/Managerment/NewspaperManagement/listNewspaper';
import ListUser from '../pages/Managerment/UserManagement/listUser';
import EditNewspaper from '../pages/Managerment/NewspaperManagement/editNewspaper';
import AddNewspaper from '../pages/Managerment/NewspaperManagement/addNewspaper';
import EditUser from '../pages/Managerment/UserManagement/editUser';
import AddUser from '../pages/Managerment/UserManagement/addUser';
import ConfirmForgot from '../pages/Forgot/ConfirmForgot';
import ListComment from '../pages/Managerment/CommentManagement/CommentManagement';
import WriteNew from '../pages/WriteNew/WriteNew';

//Public Route
export const publicRoutes = [
    { path: routeConfig.dashboard, component: DashBoard },
    { path: routeConfig.home, component: Home },
    { path: routeConfig.reduxexamples, component: ReduxExample, layout: HeaderOnly },
    { path: routeConfig.listNewByCategory, component: Category },
    { path: routeConfig.signin, component: SignIn, layout: HeaderOnly },
    { path: routeConfig.signup, component: SignUp, layout: HeaderOnly },
    { path: routeConfig.forgot, component: Forgot, layout: HeaderOnly },
    { path: routeConfig.confirmforgot, component: ConfirmForgot, layout: HeaderOnly },
    { path: routeConfig.writenew, component: WriteNew },

    //admin routes
    // { path: routeConfig.adminDashboard, component: Dashboard, layout: HeaderOnly},
    { path: routeConfig.newspaperManagement, component: ListNewspaper, layout: DashboardAdmin },
    { path: routeConfig.editNewspaper, component: EditNewspaper, layout: DashboardAdmin },
    { path: routeConfig.addNewspaper, component: AddNewspaper, layout: DashboardAdmin },
    { path: routeConfig.userManagement, component: ListUser, layout: DashboardAdmin },
    { path: routeConfig.editUser, component: EditUser, layout: DashboardAdmin },
    { path: routeConfig.addUser, component: AddUser, layout: DashboardAdmin },
    { path: routeConfig.commentManagement, component: ListComment, layout: DashboardAdmin },
    { path: '/', component: Home },
];
export const privateRoutes = [];
