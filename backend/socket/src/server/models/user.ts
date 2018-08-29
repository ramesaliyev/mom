export default class User {
  constructor(
    readonly id: number,
    readonly firstName: string,
    readonly lastName: string,
    readonly accessToken: string,
  ) {}
}