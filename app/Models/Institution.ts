import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Post from './Post'
import Contact from './Contact'

export default class Institution extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public image: string

  @column()
  public contact: string

  @column({})
  public admins: User[]

  @column({})
  public members: User[]

  @column({})
  public requests: User[]

  @column({})
  public posts: Post[]

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Setting Contact foreign Key
  @belongsTo(() => Contact)
  public contacts: BelongsTo<typeof Contact>
}
