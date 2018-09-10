import { getRepository } from "typeorm";
import { User } from "../../entities/user";

export default async (content) => {
  const { payload } = content;
  const repository = getRepository(User);

  const isExist = await repository.findOne({ email: payload.email });

  if (isExist) {
    return {
      error: true,
      message: 'Email is already used.',
    };
  }

  const user: any = repository.create(payload);
  await repository.save(user);

  return user.safeResponse();
}