import bycryt from 'bcryptjs';

export function hashPassword(password: string): string {
  return bycryt.hashSync(password, 8);
}

export function validatePassword(password: string, hash: string): Promise<boolean> {
  return bycryt.compare(password, hash);
}
