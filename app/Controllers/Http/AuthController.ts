import User from "App/Models/User";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Mail from "@ioc:Adonis/Addons/Mail";
import { constants } from "App/Utils/constants";

const randomString = require("random-string");

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
    await request.validate({
      schema: validations,
      messages: {
        "email.required": "Email is required",
        "email.unique": "Email has been registered",
        "password.required": "Password is required",
        "password.comfirm": "Password needs to be comfirmed",
      },
    });
    const user = await User.create({
      email: request.input("email"),
      password: request.input("password"),
      confirmationToken: randomString({ length: 40 }),
    });

    await user.save();

    //Send verification Mail
    await Mail.send((message) => {
      message
        .from("within@skilciti.com")
        .to(request.input("email"))
        .subject(
          `Welcome Onboard! Please verify your email. \n${constants.HOST_URL}/register/confirm/${user.confirmationToken}`
        )
        .htmlView("emails/verify", { user });
    });

    return response.created({ message: "User has been created, verify email", user: user });
  }

  // Confirm Email
  public async confirmEmail({ params, view }: HttpContextContract) {
    //get user with confiramtion token
    const user = await User.findBy("confirmation_token", params.token);

    if (user) {
      user.confirmationToken = "";
      user.isActive = true;

      //persist user to database
      await user.save();

      const state = {
        message: "Email has been verified",
      };
      return view.render("emails/email_comfirmed", state);
    }
    const state = {
      message: "Email has Not been verified",
    };
    return view.render("emails/email_comfirmed", state);
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
