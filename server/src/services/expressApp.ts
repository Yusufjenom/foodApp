import express, { Application } from "express";
import {
  adminRoute,
  vendorRoute,
  clientShoppingRoute,
  userRoute,
} from "../routes";
import { ErrorHandler } from "../middlewares/ErrorHandler";
import path from "path";

export default async (app: Application) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "images")));
  app.use(express.json());
  app.use("/api/v1", userRoute);
  app.use("/api/v1", adminRoute);
  app.use("/api/v1", vendorRoute);
  app.use("/api/v1", clientShoppingRoute);
  app.use(ErrorHandler);

  return app;
};
