import { prop } from "@typegoose/typegoose";
import { Field, Int, ObjectType } from "type-graphql";
import { getConfig, getConfigFieldModifier } from "../block-config-base";
import { GetConfigArgs, ILessonBlock } from "../ILessonBlock";
import { SpeechScrambleConfig, SpeechScrambleConfigByPhase, speechScrambleConfigs } from "./config";
import { SpeechScrambleGenerator } from "./generator";
import { speechScrambleModifiers } from "./modifiers";

@ObjectType()
export class SpeechScrambleBlock extends ILessonBlock {
  static getConfig({ preset, phases, level }: GetConfigArgs) {
    return getConfig({
      configMap: speechScrambleConfigs,
      preset,
      phases,
      level,
    });
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
