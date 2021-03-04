import { prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { BlockStepType, BlockType, BlockTypeTag } from "../../../enums";
import { MgBase } from "../../../typed/mg.model.base";
import {
  ConfigConstructorArgs,
  ConfigGeneratorArgs,
} from "../block-config-base";
import { ILessonBlock } from "../ILessonBlock";
import { SentenceDicConfig } from "./config";
import { SentenceDicGenerator } from "./generator";

export interface StDicConstructorProps {
  trackIdx: number;
  allowInitialLetterHint: boolean;
  dedicatedPoint: number;
}

@ObjectType({ implements: [MgBase, ILessonBlock] })
export class SentenceDicBlock extends ILessonBlock {
  static getGenConfig(args: ConfigGeneratorArgs) {
    return SentenceDicConfig.getGenConfig(args);
  }
  static getConfigDetail(args: ConfigConstructorArgs) {
    return new SentenceDicConfig(args);
  }

  static generator = SentenceDicGenerator.generate;

  blockStepType = BlockStepType.st;
  blockType = BlockType.st_dic;
  blockTypeTags = [BlockTypeTag.wt, BlockTypeTag.rd];

  @Field()
  @prop()
  allowInitialLetterHint: boolean;

  constructor(args: StDicConstructorProps) {
    super();
    Object.assign(this, args);
  }
}
