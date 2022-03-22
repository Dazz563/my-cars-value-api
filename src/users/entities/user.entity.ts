import {
  CreateDateColumn,
  UpdateDateColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Hooks (triggered ONLY with create() in typeorm repository)
  @AfterInsert()
  logInsert() {
    console.log(`Inserted User with id: ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated User with id: ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Deleted User with id: ${this.id}`);
  }
}
