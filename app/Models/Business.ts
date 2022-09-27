import { DateTime } from "luxon";
import { BaseModel, belongsTo, BelongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import User from "./User";

export default class Business extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public name: string;

  @column()
  public description: string;

  @column()
  public userId: string;

  @column()
  public category: string;

  @column()
  public images: string[];

  @column()
  public likes: number;

  @column()
  public contactId: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  // Setting User foreign Key
  @belongsTo(() => User)
  public owner: BelongsTo<typeof User>;
}
