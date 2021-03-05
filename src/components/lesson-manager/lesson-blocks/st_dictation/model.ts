import { getDiscriminatorModelForClass, prop } from "@typegoose/typegoose";
import { Field, Int, ObjectType } from "type-graphql";
import { BlockStepType, BlockType, BlockTypeTag, Phases } from "../../../enums";
import { TokkenTrack } from "../../../tracks";
import { MgBase, MgIdBase } from "../../../typed";
import {
  BlockGenContext,
  ConfigConstructorArgs,
  ConfigGeneratorArgs,
} from "../IBlockConfig";
import { ILessonBlock, LessonBlockBaseModel } from "../ILessonBlock";
import { SentenceDicConfig } from "./config";
import { SentenceDicGenerator } from "./generator";

export interface StDicConstructorProps {
  trackIdx: number;
  allowInitialLetterHint: boolean;
  dedicatedPoint: number;
  phase: Phases;
}

@ObjectType({ implements: [MgIdBase, MgBase, ILessonBlock] })
export class SentenceDicBlock extends ILessonBlock {
  static getGenConfig(args: ConfigGeneratorArgs) {
    return SentenceDicConfig.getGenConfig(args);
  }
  static getConfigDetail(args: ConfigConstructorArgs) {
    return new SentenceDicConfig(args);
  }

  static async extract(ctx: BlockGenContext<TokkenTrack>) {
    return await new SentenceDicGenerator(ctx).extract();
  }

  static async generate(ctx: BlockGenContext<TokkenTrack>, trackIdx: number) {
    return await new SentenceDicGenerator(ctx).generate({ trackIdx });
  }

  static getGenerator(ctx: BlockGenContext<TokkenTrack>) {
    return new SentenceDicGenerator(ctx);
  }

  blockStepType = BlockStepType.st;
  blockType = BlockType.st_dic;
  blockTypeTags = [BlockTypeTag.wt, BlockTypeTag.rd];

  @Field()
  @prop()
  allowInitialLetterHint: boolean;

  @Field(() => Int)
  @prop()
  trackIdx: number;

  constructor(args: StDicConstructorProps) {
    super();
    Object.assign(this, args);
  }
}

export const SentenceDicBlockModel = getDiscriminatorModelForClass(
  LessonBlockBaseModel,
  SentenceDicBlock
);
