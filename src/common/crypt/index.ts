import bycryt from 'bcryptjs';

export function hashPassword(password: string) {
  return bycryt.hashSync(password, 8);
}

export function validatePassword(password: string, hash: string) {
  return bycryt.compare(password, hash);
}
