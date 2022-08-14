import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import { auth, authAdmin } from '../middlewares/middleware';

let router = express.Router();
//app can be understood here as an application for 1 server
let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.put('/put-crud', homeController.putCRUD);
    router.delete('/delete-crud', homeController.deleteCRUD);

    router.post('/api/register', userController.handleRegister);
    router.post('/api/activation', userController.activateEmail);
    router.post('/api/login', userController.handleLogin);

    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.get('/api/get-all-users', userController.handleGetUserOrAllUsers);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    router.get('/api/allcode', userController.getAllCode);

    //Social login
    router.post('/api/facebook_login', userController.facebookLogin);

    return app.use('/', router);
};

module.exports = initWebRoutes;
