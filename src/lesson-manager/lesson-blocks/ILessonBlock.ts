import { getModelForClass, prop } from "@typegoose/typegoose";
import {
  Field,
  ID,
  InputType,
  Int,
  InterfaceType,
  ObjectType,
} from "type-graphql";
import {
  AutoGenPreset,
  BlockStepType,
  BlockType,
  BlockTypeTag,
  ExtractLevel,
  Phases,
} from "../../enums";
import { MgBase } from "../../typed/mg.model.base";
import {
  BlockConfigBase,
  BlockGenConfig,
  ConfigByPhase,
  ConfigConstructorArgs,
  ConfigGeneratorArgs,
} from "./block-config-base";
import { BlockGeneratorBase } from "./block-generator-base";

export interface GetConfigArgs {
  preset: AutoGenPreset;
  level: number;
  phases: Phases[];
}

@InputType()
@ObjectType()
export class BlockGenInfo {
  @Field()
  generate: boolean;

  @Field(() => BlockType)
  blockName: BlockType;

  @Field(() => ExtractLevel)
  extractLevel: ExtractLevel;
}

@ObjectType()
export class PresetLayerByPhase {
  @Field(() => BlockGenInfo)
  [Phases.Learn]: BlockGenInfo;

  @Field(() => BlockGenInfo)
  [Phases.Review]: BlockGenInfo;

  @Field(() => BlockGenInfo)
  [Phases.Test]: BlockGenInfo;
}

export interface ConfigDetailArgs {
  phase: Phases;
  level: number;
}

@InterfaceType({
  resolveType: (val: any) => val.constructor.name,
  implements: MgBase,
})
export abstract class ILessonBlock extends MgBase {
  static getGenConfig(args: ConfigGeneratorArgs): BlockGenConfig {
    console.log(args);
    throw new Error("You have Invoked Abstract class static method!");
  }
  static getConfigDetail(args: ConfigConstructorArgs): BlockConfigBase {
    console.log(args);
    throw new Error(
      "You have Invoked Abstract class static method[getConfigDetail]"
    );
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
