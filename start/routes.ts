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

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

    Route.group(() => {
        Route.post('/institution', 'TodosController.create')
        Route.get('/institution', 'TodosController.index')
        Route.get('/institution/:id', 'TodosController.show')
        Route.patch('/institution/:id', 'TodosController.update')
        Route.delete('/institution/:id', 'TodosController.destroy')
    }).middleware('auth')

    Route.get('/', 'TestsController.index')
    Route.post('/register', 'AuthController.index')
    Route.post('/login', 'AuthController.login')

  
  }).prefix('api')
