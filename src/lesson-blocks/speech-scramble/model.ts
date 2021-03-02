import { prop } from "@typegoose/typegoose";
import { Field, Int, ObjectType } from "type-graphql";
import { AutoGenPreset, Phases } from "../../enums";
import { MgBase } from "../../typed/mg.model.base";
import { getConfigByPreset } from "../block-config-base";
import { ILessonBlock } from "../ILessonBlock";
import { speechScrambleConfigs } from "./config";

@ObjectType()
export class SpeechScrambleBlockConfigCommon {}

@ObjectType({ implements: [MgBase, ILessonBlock] })
export class SpeechScrambleBlock
  extends ILessonBlock
  implements SpeechScrambleBlockConfigCommon {
  static getConfig(preset: AutoGenPreset, level: number, phases: Phases[]) {
    getConfigByPreset({
      configMap: speechScrambleConfigs,
      preset,
      phases,
      level,
    });
  }
  static create() {}

  sensitivity: number;
  allowMouse: boolean;
  tokkenGroupLevel: number;
  hiddenTokkenLevel: number;

  @Field(() => Int)
  @prop()
  trackIdx: number;
}
