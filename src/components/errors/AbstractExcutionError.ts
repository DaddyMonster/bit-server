import {
  ApolloErrorConstructor,
  CreateApolloError,
} from "./create-apollo-error";

interface ErrorConstructor extends Partial<ApolloErrorConstructor> {
  methodName: string;
}

export class AbstactExcutionError extends CreateApolloError {
  errInfo: ApolloErrorConstructor;
  constructor(info: ErrorConstructor) {
    const errInfo = {
      code: info.code ?? "AbstactExcutionError",
      message:
        info.message ??
        "You have invoked Abstract Class Method : " + `[${info.methodName}]`,
      path: info.path ?? "UNKNOWN",
    };
    super(errInfo);
    this.throw();
  }
}
