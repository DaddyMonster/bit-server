import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { AutoGenPreset, LessonTypes, ResourceTypes } from "../enums";
import { Resource, ResourceModel } from "./resource-manager/resource.base";
import { MgBase } from "../typed/mg.model.base";
import { CreatorInfo } from "./creator-info.model";

@ObjectType({ implements: MgBase })
export class LessonBase extends MgBase {
  @Field(() => LessonTypes)
  @prop()
  lessonType: LessonTypes;

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
  @prop({ ref: () => ResourceModel })
  resourceRef: Ref<Resource>;

  @Field(() => ResourceTypes)
  @prop()
  resourceType: ResourceTypes;

  @Field(() => AutoGenPreset)
  @prop()
  autogenPreset: AutoGenPreset;
}

export const LessonModel = getModelForClass(LessonBase);
