import { prop } from "@typegoose/typegoose";
import { createUnionType, Field, ObjectType } from "type-graphql";
import { AutoGenPreset, BlockType } from "../enums";
import { BlockGenConfig } from "./lesson-blocks/block-config-base";
import { SpeechScrambleConfig } from "./lesson-blocks/speech-scramble/config";
import { SentenceDicConfig } from "./lesson-blocks/st_dictation/config";
import { keyBy } from "lodash";
import { RolePlayConfigInfered } from "./lesson-blocks/role-play/config";
export interface BlockTrackRef {
  trackId: string;
}

const BlockConfigUnion = createUnionType({
  name: "BlockConfigUnion",
  types: () => [SpeechScrambleConfig, SentenceDicConfig],
});

@ObjectType()
class LessonBlockConfig {
  @Field(() => BlockType)
  @prop()
  blockType: BlockType;

  @Field(() => BlockGenConfig)
  @prop({ type: () => BlockGenConfig })
  genConfig: BlockGenConfig;

  @Field(() => [BlockConfigUnion], { nullable: true })
  @prop({ type: () => BlockConfigUnion })
  configModel?: typeof BlockConfigUnion[] | null;
}

// THIS IS BASIC CONFIG TO DETERMINE WHETHER TO GENERATE OR NOT

export type BlockConfigMap = {
  [key in BlockType]: LessonBlockConfig;
};
export type ConfigModelMap = {
  [key in BlockType]: typeof BlockConfigUnion;
};

@ObjectType()
export class LessonConfig {
  static createBlockConfigMap(
    blockConfigs: LessonBlockConfig[]
  ): BlockConfigMap {
    return keyBy(blockConfigs, (config) => config.blockType) as BlockConfigMap;
  }

  @Field(() => AutoGenPreset)
  @prop()
  preset: AutoGenPreset;

  @Field(() => [LessonBlockConfig])
  @prop({ type: () => [LessonBlockConfig] })
  blockConfigs: LessonBlockConfig[];

  @Field(() => RolePlayConfigInfered, { nullable: true })
  @prop({ type: () => RolePlayConfigInfered })
  rolePlayContext: RolePlayConfigInfered | null;
}
