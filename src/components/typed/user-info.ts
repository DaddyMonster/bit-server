import { Field, ID, ObjectType } from "type-graphql";
import { SparkUserFrom } from "../enums";

@ObjectType()
export class UserInfo {
  @Field(() => ID)
  userId: number;

  @Field(() => SparkUserFrom)
  userFrom: SparkUserFrom;
}
