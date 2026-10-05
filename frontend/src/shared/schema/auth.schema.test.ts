import { describe, it, expect } from "vitest";
import {
  loginSchema,
  usernameRegex,
  passwordRegex,
  registerSchema,
  resetPasswordSchema,
  forgetPasswordSchema,
} from "@/shared";

describe("Regex Validations", () => {
  it("should validate correct usernames", () => {
    expect(usernameRegex.test("john_doe")).toBe(true);
    expect(usernameRegex.test("A1_b")).toBe(true);
  });
  it("should validate correct password", () => {
    expect(passwordRegex.test("Password@123")).toBe(true);
    expect(passwordRegex.test("Admin$1234")).toBe(true);
  });
  it("should reject invalid usernames", () => {
    expect(usernameRegex.test("ab")).toBe(false);
    expect(usernameRegex.test("123user")).toBe(false);
    expect(usernameRegex.test("user@name")).toBe(false);
  });
  it("should validate strong passwords", () => {
    expect(passwordRegex.test("Password@123")).toBe(true);
  });

  it("should reject weak passwords", () => {
    expect(passwordRegex.test("password")).toBe(false);
    expect(passwordRegex.test("Pass1!")).toBe(false);
  });
});

describe("Login Schema", () => {
  it("should pass with valid credentials", () => {
    const result = loginSchema.safeParse({
      email: "test@example.com",
      password: "password123",
    });
    expect(result.success).toBe(true);
  });

  it("should fail with short password", () => {
    const result = loginSchema.safeParse({
      email: "test@example.com",
      password: "123",
    });
    expect(result.success).toBe(false);
  });
});

describe("Register Schema", () => {
  const validUser = {
    firstName: "Ali",
    lastName: "Rezaei",
    username: "ali_rezaei",
    email: "ali@example.com",
    password: "password123",
    policy: true,
  };

  it("should pass with valid registration data", () => {
    const result = registerSchema.safeParse(validUser);
    expect(result.success).toBe(true);
  });

  it("should fail if first name is too short", () => {
    const result = registerSchema.safeParse({ ...validUser, firstName: "Al" });
    expect(result.success).toBe(false);
  });

  it("should fail if policy is not checked (false)", () => {
    const result = registerSchema.safeParse({ ...validUser, policy: false });
    expect(result.success).toBe(false);
  });
});

describe("Forget Password Schema", () => {
  it("should pass with valid email", () => {
    const result = forgetPasswordSchema.safeParse({ email: "user@domain.com" });
    expect(result.success).toBe(true);
  });

  it("should fail with invalid email", () => {
    const result = forgetPasswordSchema.safeParse({ email: "invalid-email" });
    expect(result.success).toBe(false);
  });
});

describe("Reset Password Schema", () => {
  it("should pass when passwords match", () => {
    const result = resetPasswordSchema.safeParse({
      password: "SecurePassword123!",
      confirmPassword: "SecurePassword123!",
    });
    expect(result.success).toBe(true);
  });

  it("should fail when passwords do not match", () => {
    const result = resetPasswordSchema.safeParse({
      password: "SecurePassword123!",
      confirmPassword: "DifferentPassword123!",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain("confirmPassword");
    }
  });
});
