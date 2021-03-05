import {
  ApolloErrorConstructor,
  CreateApolloError,
} from "./create-apollo-error";

export class BadReqError extends CreateApolloError {
  errInfo: ApolloErrorConstructor;
  constructor(info: Partial<ApolloErrorConstructor>) {
    const errInfo = {
      code: info.code ?? "BAD REQUEST ERROR",
      message: info.message ?? "존재하지 않는 리소스이거나 잘못된 요청입니다.",
      path: info.path ?? "UNKNOWN",
    };
    super(errInfo);
    this.throw();
  }
}
