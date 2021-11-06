import bycryt from 'bcryptjs';

export function hashPassword(password: string) {
  return bycryt.hashSync(password, 8);
}