import { ApolloErrorConstructor, CreateApolloError } from "./create-apollo-error";

export declare class AuthError extends CreateApolloError {

    errInfo: ApolloErrorConstructor;

    constructor(info: Partial<ApolloErrorConstructor>);

}

