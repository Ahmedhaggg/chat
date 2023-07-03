import { Application } from "express";
import userAuthRoutes from "./userAuth"

export default (app: Application) => {
    app.use("/api", userAuthRoutes);
    
}