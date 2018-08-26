import User from './user';

export default class Message {
    constructor(
      readonly user: User,
      readonly content: string
    ) {}
}