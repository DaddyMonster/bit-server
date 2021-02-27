export interface ApolloErrorConstructor {

    message: string;

    path: string;

    code: string;

}

export declare class CreateApolloError {

    errInfo: ApolloErrorConstructor;

    constructor(info: ApolloErrorConstructor);

    throw(): void;

}

