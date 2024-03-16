import express, { Application } from 'express';
import { adminRoute, vendorRoute } from '../routes';
import { ErrorHandler } from '../middlewares/ErrorHandler';
import path from 'path';

export default async (app: Application) => {
    app.use(express.urlencoded({extended: true}));
    app.use(express.static(path.join(__dirname, 'images')));
    app.use(express.json());
    app.use(adminRoute);
    app.use(vendorRoute);
    app.use(ErrorHandler);

    return app;
};


