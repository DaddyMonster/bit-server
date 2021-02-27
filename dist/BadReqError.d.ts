import { ApolloErrorConstructor, CreateApolloError } from "./create-apollo-error";

export declare class BadReqError extends CreateApolloError {

    errInfo: ApolloErrorConstructor;

    constructor(info: Partial<ApolloErrorConstructor>);

}

