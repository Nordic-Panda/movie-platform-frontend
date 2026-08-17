export class ApiException extends Error {
  public code: string;
  public details: Record<string, string[]>;

  constructor(
    code: string,
    message: string,
    details: Record<string, string[]>,
  ) {
    super(message);

    this.name = "ApiException";
    this.code = code;
    this.details = details;
  }
}
