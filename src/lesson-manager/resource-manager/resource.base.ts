import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { LessonTypes, ResourceTypes } from "../../enums";
import { MgBase } from "../../typed/mg.model.base";
import { CreatorInfo } from "../creator-info.model";
import { IResourceData } from "./resource-data/IResourceData";
import { SoriResourceData } from "./resource-data/sori-resource-data";

@ObjectType()
@modelOptions({
  schemaOptions: { discriminatorKey: "resourceDataType" },
})
export class Resource extends MgBase {
  @Field(() => ResourceTypes)
  @prop()
  type: ResourceTypes;

  @Field(() => [LessonTypes])
  @prop({ type: () => [String] })
  availLessonList: LessonTypes[];

  @Field()
  @prop()
  resourceName: string;

  @Field(() => CreatorInfo)
  @prop({ type: () => CreatorInfo })
  creatorInfo: CreatorInfo;

  @Field()
  @prop()
  isReady: boolean;

  @Field(() => IResourceData)
  @prop({
    type: () => IResourceData,
    discriminators: () => [{ type: SoriResourceData, value: ResourceTypes.Sv }],
  })
  resourceData: IResourceData;
}

export const ResourceModel = getModelForClass(Resource);
