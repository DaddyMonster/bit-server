import {
  ApolloErrorConstructor,
  CreateApolloError,
} from "./create-apollo-error";

export class NetworkErr extends CreateApolloError {
  errInfo: ApolloErrorConstructor;
  constructor(info: Partial<ApolloErrorConstructor>) {
    const errInfo = {
      code: info.code ?? "ENGSPARK_SERVER_NETWORK_ERROR",
      message: info.message ?? "DB 응답이 지연되거나 서버가 원할하지 않습니다.",
      path: info.path ?? "UNKNOWN",
    };
    super(errInfo);
    this.throw();
  }
}
