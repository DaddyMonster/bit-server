import { prop } from "@typegoose/typegoose";
import { Base } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { LessonTypes, Phases } from "../enums";
import { CreatorInfo } from "./creator-info.model";

@ObjectType()
export class Lesson implements Base<string> {
  @Field(() => ID)
  _id: string;

  @Field(() => LessonTypes)
  @prop()
  lessonType: LessonTypes;

  @Field(() => [Phases])
  @prop({ type: () => [String] })
  phases: Phases[];

  @Field()
  @prop()
  lessonTitle: string;

  @Field()
  @prop({ type: () => CreatorInfo })
  creatorInfo: CreatorInfo;

  @Field(() => Int)
  @prop()
  level: number;
}
