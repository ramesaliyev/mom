import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";

import * as credential from 'credential';
import * as pick from 'lodash.pick';

import { Job } from 'modules/job/job.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(
    type => Job,
    job => job.owner,
    { cascade: true }
  )
  jobs: Job[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @VersionColumn()
  version: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    return this.password && await new Promise((resolve, reject) =>
      credential().hash(this.password, (err, hash) =>
        err ? reject(err) : resolve(this.password = hash)
      )
    );
  }

  async comparePasswords(input, stored = this.password) {
    return await new Promise((resolve, reject) =>
      credential().verify(stored, input, (err, isValid) =>
        err ? reject(err) : resolve(isValid)
      )
    );
  }

  safeResponse() {
    return pick(this, [
      'id',
      'firstName',
      'lastName',
      'email',
      'createdAt',
      'updatedAt',
    ]);
  }
}