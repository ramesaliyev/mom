import { getRepository } from "typeorm";
import { Job } from "../../entities/job";
import { User } from "../../entities/user";

export default async (content) => {
  const payload = {...content.payload};
  const jobRepository = getRepository(Job);
  const userRepository = getRepository(User);

  let job: any;

  if (payload.id) {
    job = await jobRepository.findOne({ id: payload.id });
    jobRepository.merge(job, payload);
  } else {
    job = jobRepository.create(payload);
  }

  if (payload.owner) {
    const user = await userRepository.findOne({ id: payload.owner.id });
    job.owner = user;
  }

  await jobRepository.save(job);

  return job;
}