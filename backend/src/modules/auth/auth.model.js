export class User {
  constructor({
    id,
    email,
    username = null,
    password = null,
    first_name = "",
    last_name = "",
    gender = "male",
    role = "manager",
    provider = "local",
    created_at = new Date(),
  }) {
    this.id = id ?? crypto.randomUUID();
    this.email = email;
    this.username = username;
    this.password = password;
    this.first_name = first_name;
    this.last_name = last_name;
    this.gender = gender;
    this.role = role;
    this.provider = provider;
    this.created_at = created_at;
  }

  static fromLocalSignup({ email, username, hashedPassword, fullName }) {
    return new User({
      email,
      username,
      password: hashedPassword,
      first_name: fullName,
      provider: "local",
    });
  }

  static fromGoogleProfile({ email, name }) {
    const [given_name, family_name, ...rest] = (name || "").split(" ");
    return new User({
      email,
      first_name: given_name || "",
      last_name: family_name || "",
      provider: "google",
    });
  }

  toPublic() {
    const { first_name, last_name, email, role, gender, provider, id } = this;
    return { first_name, last_name, email, role, gender, provider, id };
  }
}
