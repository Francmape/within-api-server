import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import User from "./User";
import Contact from "./Contact";

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public title: string;

  @column()
  public description: string;

  @column()
  public contactId: string;

  @column()
  public userId: string;

  @column()
  public likes: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  // Setting User foreign Key
  @belongsTo(() => User)
  public owner: BelongsTo<typeof User>;

  // Setting Contact foreign Key
  @belongsTo(() => Contact)
  public contacts: BelongsTo<typeof Contact>;
}
