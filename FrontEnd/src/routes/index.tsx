import routeConfig from '../config/routes';
//Lyaouts
import HeaderOnly from '../layout/headerOnly';

//Pages
import DashBoard from '../pages/DashBoard';
import Home from '../pages/Home';
import ReduxExample from '../pages/ReduxExample';
import LearnFluentUI from '../pages/LearnFluentUi';
import TongHop from '../pages/TongHop';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Category from '../pages/Category/category';
import Dashboard from '../pages/Managerment/Dashboard/dashboard';
import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';


//Public Route
export const publicRoutes = [
    { path: routeConfig.dashboard, component: DashBoard },
    { path: routeConfig.home, component: Home },
    { path: routeConfig.reduxexamples, component: ReduxExample, layout: HeaderOnly },
    { path: routeConfig.learnfluentui, component: LearnFluentUI, layout: HeaderOnly },
    { path: routeConfig.tonghop, component: TongHop, layout: HeaderOnly },
    { path: routeConfig.login, component: Login, layout: HeaderOnly },
    { path: routeConfig.register, component: Register, layout: HeaderOnly },
    { path: routeConfig.listNewByCategory, component: Category },
    { path: routeConfig.adminDashboard, component: Dashboard },
    { path: routeConfig.signin, component: SignIn, layout: HeaderOnly  },
    { path: routeConfig.signup, component: SignUp, layout: HeaderOnly  },
    { path: '/', component: Home },

];
export const privateRoutes = [];
