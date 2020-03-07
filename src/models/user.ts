import { Model } from 'objection'
import uuid from 'uuid/v4'
import BaseModel from './base'
import { GenID } from './decorators'
import { Reservation } from './reservation'
export interface User {
    id: string
    email: string
    password: string
    firstname: string
    lastname: string
    national_id: string
    phone: string
    address: string
    reservation_made?: Reservation[]
    reservation_in?: Reservation[]
}
@GenID(uuid)
export default class UserModel extends BaseModel implements User {
    id!: string
    email!: string
    password!: string
    firstname!: string
    lastname!: string
    national_id!: string
    phone!: string
    address!: string
    static tableName = 'user'
    static relationMappings = {
        reservation_made: {
            relation: Model.HasManyRelation,
            modelClass: 'reservation',
            join: {
                from: 'user.id',
                to: 'reservation.user'
            }
        },
        reservation_in: {
            relation: Model.ManyToManyRelation,
            modelClass: 'reservation',
            join: {
                from: 'user.id',
                through: {
                    from: 'reservation_member.user_id',
                    to: 'reservation_member.reservation_id'
                },
                to: 'reservation.id'
            }
        }
    }
}