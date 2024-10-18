import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const asyncScrypt = promisify(scrypt);

// A util class that has methods to hash and compare passwords.
export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buf = (await asyncScrypt(password, salt, 64)) as Buffer;
    return `${buf.toString("hex")}.${salt}`;
  }

  static async compare(storedPassword: string, providedPassword: string) {
    const [hashedPassword, salt] = storedPassword;
    const buf = (await asyncScrypt(providedPassword, salt, 64)) as Buffer;

    return buf.toString("hex") === hashedPassword;
  }
}
