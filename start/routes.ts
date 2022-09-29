/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.group(() => {
    Route.post("/institution", "InstitutionsController.create");
    Route.get("/institution", "InstitutionsController.index");
    Route.get("/institution/:id", "InstitutionsController.show");
    Route.patch("/institution/:id", "InstitutionsController.update");
    Route.delete("/institution/:id", "InstitutionsController.destroy");
  }).middleware("auth");

  Route.get("/", "TestsController.index");
  Route.post("/register", "AuthController.register");
  Route.post("/login", "AuthController.login");
  Route.get("/register/confirm/:token", "AuthController.confirmEmail");
  Route.post("/reset", "AuthController.resetPassword");
  Route.post("/password-change/:token", "AuthController.changePassword");
}).prefix("api");
