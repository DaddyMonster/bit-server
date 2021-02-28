import { prop } from "@typegoose/typegoose";
import { Field, Int, ObjectType } from "type-graphql";
import { SparkUserFrom } from "../enums";

@ObjectType()
export class CreatorInfo {
  @Field()
  @prop()
  name: string;

  @Field(() => SparkUserFrom)
  @prop()
  serviceFrom: SparkUserFrom;

  @Field(() => Int)
  @prop()
  serviceUserId: number;

  @Field(() => Int)
  @prop()
  serviceAcademyId: number;
}
