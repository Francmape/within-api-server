import User from "App/Models/User";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Mail from "@ioc:Adonis/Addons/Mail";

export default class AuthController {
  // Register
  public async register({ request, response }: HttpContextContract) {
    const validations = schema.create({
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: "users", column: "email" }),
      ]),
      password: schema.string({}, [rules.confirmed()]),
    });
    const data = await request.validate({ schema: validations });
    const user = await User.create(data);

    //Send verification Mail
    await Mail.send((message) => {
      message
        .from("within@skilciti.com")
        .to(request.input("email"))
        .subject("Welcome Onboard! Please verify your email.")
        .htmlView("emails/verify", { user });
    });

    return response.created({ message: "User has been created", user: user });
  }

  //   Login
  public async login({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.only(["email", "password"]);
    // const email = request.input('email')
    // const password = request.input('password')

    try {
      const token = await auth.attempt(email, password);
      return response.created({
        message: "User has logged in Succesful",
        token: token.toJSON(),
      });
    } catch (error) {
      return response.unauthorized({ message: error });
    }
  }

  //   Logout
  public async logout({ response, auth }: HttpContextContract) {
    try {
      await auth.logout();
      return response.ok({
        message: "User has been logged out",
      });
    } catch (error) {
      return response.unauthorized({ message: error });
    }
  }
}
