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
import { AbstactExcutionError } from "../../errors/AbstractExcutionError";
import { TrackBase } from "../../tracks";
import { MgBase } from "../../typed";
import {
  IBlockConfig,
  BlockGenConfig,
  BlockGenContext,
  ConfigConstructorArgs,
  ConfigGeneratorArgs,
} from "./IBlockConfig";
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
    throw new AbstactExcutionError({ methodName: "getGenConfig" });
  }
  static getConfigDetail(args: ConfigConstructorArgs): IBlockConfig {
    console.log(args);
    throw new AbstactExcutionError({ methodName: "getConfigDetail" });
  }

  static async generate(
    ctx: BlockGenContext<TrackBase>,
    trackIdx: number
  ): Promise<ILessonBlock[]> {
    console.log(ctx, trackIdx);
    throw new AbstactExcutionError({ methodName: "generate" });
  }

  static async extract(
    ctx: BlockGenContext<TrackBase>
  ): Promise<ILessonBlock[]> {
    console.log(ctx);
    throw new AbstactExcutionError({ methodName: "extract" });
  }

  static getGenerator(ctx: BlockGenContext<any>): BlockGeneratorBase<any> {
    console.log(ctx);
    throw new AbstactExcutionError({ methodName: "getGenerator" });
  }

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
export const LessonBlockBaseModel = getModelForClass(LessonBlockBase, {
  schemaOptions: { timestamps: true },
});
