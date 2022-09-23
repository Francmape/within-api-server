import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Post from './Post'
import Institution from './Institution'

export default class Contact extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public userId: string

  @column()
  public phone: string

  @column()
  public email: string

  @column()
  public address: string

  @column()
  public website: string

  @column()
  public facebook: string

  @column()
  public twitter: string

  @column()
  public linkedin: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Setting User foreign Key
  @belongsTo(() => User)
  public owner: BelongsTo<typeof User>

  // Setting Post foreign Key
  @hasMany(() => Post)
  public posts: HasMany<typeof Post>

  // Setting Institution foreign Key
  @hasOne(() => Institution)
  public institution: HasOne<typeof Institution>
}
