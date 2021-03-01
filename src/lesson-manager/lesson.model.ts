import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { LessonTypes, Phases } from "../enums";
import {
  IResource,
  ResourceBaseModel,
} from "../resource-manager/resource.model";
import { MgBase } from "../typed/mg.model.base";
import { CreatorInfo } from "./creator-info.model";

@ObjectType()
export class Lesson extends MgBase {
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

  @Field(() => ID)
  @prop({ ref: () => ResourceBaseModel })
  resourceRef: Ref<IResource>;
}

export const LessonModel = getModelForClass(Lesson);
