import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, ID, Int, InterfaceType, ObjectType } from "type-graphql";
import {
  AutoGenPreset,
  BlockStepType,
  BlockType,
  BlockTypeTag,
  Phases,
} from "../../enums";
import { MgBase } from "../../typed/mg.model.base";
import {
  BlockConfigBase,
  ConfigByPhase,
  ModifierArray,
} from "./block-config-base";
import { BlockGeneratorBase } from "./block-generator-base";

export interface GetConfigArgs {
  preset: AutoGenPreset;
  level: number;
  phases: Phases[];
}

@InterfaceType({
  resolveType: (val: any) => val.constructor.name,
  implements: MgBase,
})
export abstract class ILessonBlock extends MgBase {
  static getConfig({
    level,
    phases,
    preset,
  }: GetConfigArgs): ConfigByPhase | null {
    console.log(preset, level, phases);
    throw new Error("ILessonBlock dose not provide config");
  }
  static getConfigFieldModifier(): ModifierArray<any> {
    throw new Error("ILessonBlock dose not provide modifier");
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

  @Field(() => ConfigByPhase)
  @prop({ type: () => ConfigByPhase })
  config: ConfigByPhase;
}
@ObjectType()
export class LessonBlockBase extends ILessonBlock {}
export const LessonBlockBaseModel = getModelForClass(LessonBlockBase);
