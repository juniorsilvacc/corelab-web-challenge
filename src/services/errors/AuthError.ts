export class AuthError extends Error {
  constructor() {
    super("Error with autenticated token");
  }
}
