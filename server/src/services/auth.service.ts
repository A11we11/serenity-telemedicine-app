import { prisma } from "../config/database";
import { hashPassword, comparePassword } from "../utils/password.util";
import { generateToken } from "../utils/jwt.util";
import type { RegisterInput, LoginInput } from "../validations/auth.validation";

export class AuthService {
  async register(data: RegisterInput) {
    const hashedPassword = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        language: true,
      },
    });

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return { user, token };
  }

  async login(data: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await comparePassword(data.password, user.password);

    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }
}
