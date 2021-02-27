import {
  ApolloErrorConstructor,
  CreateApolloError,
} from "./create-apollo-error";

export class AuthError extends CreateApolloError {
  errInfo: ApolloErrorConstructor;
  constructor(info: Partial<ApolloErrorConstructor>) {
    const errInfo = {
      code: info.code ?? "AUTHORIZATION ERROR",
      message: info.message ?? "세션이 만료되었거나 권한이 없습니다.",
      path: info.path ?? "UNKNOWN",
    };
    super(errInfo);
    this.throw();
  }
}
