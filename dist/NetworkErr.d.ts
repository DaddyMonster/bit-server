import { ApolloErrorConstructor, CreateApolloError } from "./create-apollo-error";

export declare class NetworkErr extends CreateApolloError {

    errInfo: ApolloErrorConstructor;

    constructor(info: Partial<ApolloErrorConstructor>);

}

