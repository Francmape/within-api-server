import User from "App/Models/User";
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
    public async index({ request, response }: HttpContextContract) {
        const validations = schema.create({
            email: schema.string({}, [
                rules.email(),
                rules.unique({ table: 'users', column: 'email' })
            ]),
            password: schema.string({}, [
                rules.confirmed()
            ])
        })
        const data = await request.validate({ schema: validations })
        const user = await User.create(data)
        return response.created({ 'message': 'User has been created', 'user': user })
    }
    

    public async login({ request, response, auth }: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')
        const token = await auth.attempt(email, password)

        return response.created({ 'message': 'User has logged in Succesful', 'token': token.toJSON() })

    }
}
