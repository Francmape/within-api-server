import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import {
  BaseModel,
  column,
  beforeSave,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Post from "./Post";
import Business from "./Business";
import Contact from "./Contact";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public rememberMeToken?: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  // Setting Post foreign Key
  @hasMany(() => Post)
  public posts: HasMany<typeof Post>;

  // Setting Business foreign Key
  @hasMany(() => Business)
  public business: HasMany<typeof Business>;

  // Setting Contact foreign Key
  @hasMany(() => Contact)
  public contacts: HasMany<typeof Contact>;

  @beforeSave()
  public static async hashPassword(User: User) {
    if (User.$dirty.password) {
      User.password = await Hash.make(User.password);
    }

    const crypto = require("crypto");
    User.id = crypto.randomUUID();
  }
}
