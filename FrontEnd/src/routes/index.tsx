import routeConfig from '../config/routes';
//Lyaouts
import HeaderOnly from '../layout/headerOnly';
import Default from '../layout/default';

//Pages
import DashBoard from '../pages/DashBoard';
import Home from '../pages/Home';
import ReduxExample from '../pages/ReduxExample';
import LernMui from '../pages/LernMui';
import LearnFluentUI from '../pages/LearnFluentUi';

//Public Route
export const publicRoutes = [
    { path: '/', component: DashBoard, layout: HeaderOnly },
    { path: routeConfig.dashboard, component: DashBoard, layout: HeaderOnly },
    { path: routeConfig.home, component: Home, layout: HeaderOnly },
    { path: routeConfig.reduxexamples, component: ReduxExample, layout: HeaderOnly },
    { path: routeConfig.lernmui, component: LernMui, layout: HeaderOnly },
    { path: routeConfig.learnfluentui, component: LearnFluentUI, layout: HeaderOnly },
];
export const privateRoutes = [];
