// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TestsController {
    public async index(){
        return{ test:"API test run success" }
    }
}
