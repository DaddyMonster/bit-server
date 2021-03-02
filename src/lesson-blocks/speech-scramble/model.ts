import { prop } from "@typegoose/typegoose";
import { Field, Int, ObjectType } from "type-graphql";
import { AutoGenPreset, Phases } from "../../enums";
import { TokkenedSubTrack } from "../../tracks/track.model";
import { MgBase } from "../../typed/mg.model.base";
import {
  BlockGenContext,
  getConfig,
  getConfigFieldModifier,
} from "../block-config-base";
import { ILessonBlock } from "../ILessonBlock";
import { SpeechScrambleConfig, speechScrambleConfigs } from "./config";
import { SpeechScrambleGenerator } from "./generator";
import { speechScrambleModifiers } from "./modifiers";

@ObjectType({ implements: [MgBase, ILessonBlock] })
export class SpeechScrambleBlock extends ILessonBlock {
  static getConfig(preset: AutoGenPreset, level: number, phases: Phases[]) {
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

  @Field(() => SpeechScrambleConfig)
  @prop({ type: () => SpeechScrambleConfig })
  config: SpeechScrambleConfig;
}
