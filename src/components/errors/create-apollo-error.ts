import { ApolloError } from "apollo-server-express";

export interface ApolloErrorConstructor {
  message: string;
  path: string;
  code: string;
}

export class CreateApolloError {
  errInfo: ApolloErrorConstructor;
  constructor(info: ApolloErrorConstructor) {
    Object.setPrototypeOf(this, CreateApolloError.prototype);
    this.errInfo = info;
  }

  throw() {
    const { message, path, code } = this.errInfo;
    //MONGO ERROR COLLECTING LOGIC!
    throw new ApolloError(message, code, { parameter: path });
  }
}
