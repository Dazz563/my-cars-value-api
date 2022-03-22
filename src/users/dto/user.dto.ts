import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;
  @Expose()
  email: string;
  @Expose()
  username: string;
  @Expose()
  created_at: string;
  @Expose()
  updated_at: string;
}
