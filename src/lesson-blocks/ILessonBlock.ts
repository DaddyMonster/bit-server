import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, ID, Int, InterfaceType, ObjectType } from "type-graphql";
import {
  AutoGenPreset,
  BlockStepType,
  BlockType,
  BlockTypeTag,
  Phases,
} from "../enums";
import { TrackBase } from "../tracks/track.model";
import { MgBase } from "../typed/mg.model.base";
import {
  BlockConfigBase,
  BlockGenContext,
  ModifierArray,
} from "./block-config-base";
import { BlockGeneratorBase } from "./block-generator-base";
@InterfaceType({
  resolveType: (val: any) => val.constructor.name,
  implements: MgBase,
})
export abstract class ILessonBlock extends MgBase {
  static getConfig(
    preset: AutoGenPreset,
    level: number,
    phases: Phases[]
  ): BlockConfigBase | null {
    console.log(preset, level, phases);
    throw new Error("ILessonBlock dose not provide config");
  }
  static getConfigFieldModifier(): ModifierArray<any> {
    throw new Error("ILessonBlock dose not provide modifier");
  }
  static create(ctx: BlockGenContext<TrackBase>, config: BlockConfigBase) {
    console.log(ctx, config);
    throw new Error("ILessonBlock does not create any block!");
  }

  static generator = BlockGeneratorBase.generate;

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

  @Field(() => Int)
  @prop()
  dedicatedPoint: number;
}
@ObjectType()
export class LessonBlockBase extends ILessonBlock {}
export const LessonBlockBaseModel = getModelForClass(LessonBlockBase);
