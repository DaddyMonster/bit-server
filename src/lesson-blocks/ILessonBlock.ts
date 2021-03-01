import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, ID, InterfaceType, ObjectType } from "type-graphql";
import { BlockStepType, BlockType, BlockTypeTag, Phases } from "../enums";
import { MgBase } from "../typed/mg.model.base";
@InterfaceType({
  resolveType: (val: any) => val.constructor.name,
  implements: MgBase,
})
export abstract class ILessonBlock extends MgBase {
  @Field(() => ID)
  _id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => BlockStepType)
  @prop()
  blockStepType: BlockStepType;

  @Field(() => [BlockTypeTag])
  @prop({ type: () => [String] })
  blockTypeTags: BlockTypeTag[];

  @Field(() => BlockType)
  @prop()
  blockType: BlockType;

  @Field(() => Phases)
  @prop()
  phase: Phases;
}
@ObjectType()
export class LessonBlockBase extends ILessonBlock {}
export const LessonBlockBaseModel = getModelForClass(LessonBlockBase);
