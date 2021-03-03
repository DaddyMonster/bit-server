import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { AutoGenPreset, BlockType, LessonTypes, ResourceTypes } from "../enums";
import { MgBase } from "../typed/mg.model.base";
import { CreatorInfo } from "./creator-info.model";
import { Resource, ResourceModel } from "./resource-manager/resource.base";

type AvailBlockLists = {
  [key in LessonTypes]: BlockType[];
};

export const availBlockLists: AvailBlockLists = {
  sori: [
    BlockType.ww,
    BlockType.st_sc,
    BlockType.st_ph,
    BlockType.st_dic,
    BlockType.rp,
    BlockType.voc_pat,
    BlockType.voc_lit,
  ],
  book: [],
  text: [],
  vid: [],
  voca: [],
};

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

  @Field()
  get availBlocks() {
    return availBlockLists[this.lessonType];
  }
}

export const LessonModel = getModelForClass(LessonBase);
