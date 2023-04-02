import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import routeRoutes from "./routes/routes.js";
import testRoutes from "./routes/tests.js";
import projectRoutes from "./routes/projects.js";
import dataRoutes from "./routes/data.js";
import publicApiRoutes from "./routes/publicApi.js";

import { faker } from "@faker-js/faker";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/routes", routeRoutes);
app.use("/tests", testRoutes);
app.use("/projects", projectRoutes);
app.use("/datas", dataRoutes);
app.use("/api", publicApiRoutes);


/* MONOGOOSE SETUP */
const PORT = process.env.PORT || 5001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
