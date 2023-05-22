import routeConfig from '../config/routes';
//Lyaouts
import HeaderOnly from '../layout/headerOnly';
// import Default from '../layout/default';

//Pages
import DashBoard from '../pages/DashBoard';
import Home from '../pages/Home';
import ReduxExample from '../pages/ReduxExample';
import LearnFluentUI from '../pages/LearnFluentUi';
import TongHop from '../pages/TongHop';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Category from '../pages/Category/category';


//Public Route
export const publicRoutes = [
    { path: routeConfig.dashboard, component: DashBoard, layout: HeaderOnly },
    { path: routeConfig.home, component: Home, layout: HeaderOnly },
    { path: routeConfig.reduxexamples, component: ReduxExample, layout: HeaderOnly },
    { path: routeConfig.learnfluentui, component: LearnFluentUI, layout: HeaderOnly },
    { path: routeConfig.tonghop, component: TongHop, layout: HeaderOnly },
    { path: routeConfig.login, component: Login, layout: HeaderOnly },
    { path: routeConfig.register, component: Register, layout: HeaderOnly },
    { path: routeConfig.listNewByCategory, component: Category, layout: HeaderOnly },
    { path: '/', component: DashBoard, layout: HeaderOnly },

];
export const privateRoutes = [];
