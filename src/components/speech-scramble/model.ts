import { prop } from "@typegoose/typegoose";
import { Field, Int, ObjectType } from "type-graphql";
import { getConfigFieldModifier } from "../lesson-manager/lesson-blocks/IBlockConfig";
import {
  GetConfigArgs,
  ILessonBlock,
} from "../lesson-manager/lesson-blocks/ILessonBlock";
import { SpeechScrambleConfigByPhase, speechScrambleConfigs } from "./config";
import { SpeechScrambleGenerator } from "./generator";
import { speechScrambleModifiers } from "./modifiers";

@ObjectType()
export class SpeechScrambleBlock extends ILessonBlock {
  static getConfig({ preset, phases, level }: GetConfigArgs) {
    return;
  }
  static getConfigFieldModifier() {
    return getConfigFieldModifier(speechScrambleModifiers);
  }
  static generator = SpeechScrambleGenerator.generate;

  @Field(() => Int)
  @prop()
  trackIdx: number;

  @Field()
  @prop()
  blockPhaseGroupId!: string;

  @Field(() => SpeechScrambleConfigByPhase)
  @prop({ type: () => SpeechScrambleConfigByPhase })
  config: SpeechScrambleConfigByPhase;
}
