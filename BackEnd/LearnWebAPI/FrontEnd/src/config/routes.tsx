const routeConfig = {
    dashboard: '/newsdetail/:id',
    home: '/home',
    reduxexamples: '/reduxexamples',
    tonghop: '/tonghop',
    listNewByCategory: '/listNews/:category',
    signin: '/signin',
    signup: '/signup',
    forgot: '/forgot',
    confirmforgot: '/confirmforgot',
    userProfile: '/userProfile',
    writenew: '/writenew',

    //admin routes
    adminDashboard: '/management',
    newspaperManagement: '/newspaperManagement',
    addNewspaper: '/addNewspaper',
    editNewspaper: '/editNewspaper/:id',
    userManagement: '/userManagement',
    editUser: '/editUser/:id',
    addUser: '/addUser',
    commentManagement: '/commentManagement',
};

export default routeConfig;
