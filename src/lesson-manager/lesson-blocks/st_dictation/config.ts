import { prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { AutoGenPreset, ExtractLevel, Phases } from "../../../enums";
import { allTrue } from "../../../util/lesson-config-util";
import {
  allPhases,
  BlockConfigBase,
  BlockGenConfig,
  ConfigConstructorArgs,
  ConfigGeneratorArgs,
} from "../block-config-base";

type MapByPreset<T> = {
  [key in AutoGenPreset]?: T;
};
const genMapByPreset: MapByPreset<boolean> = {
  "sori-full": true,
  "sori-light": false,
  "sori-role-aid": false,
  "sori-standard": true,
};
const extractMapByPresetM: MapByPreset<ExtractLevel> = {
  "sori-full": ExtractLevel.M,
  "sori-light": ExtractLevel.L,
  "sori-role-aid": ExtractLevel.L,
  "sori-standard": ExtractLevel.M,
};
function getGenerate(preset: AutoGenPreset, level: number) {
  return (genMapByPreset[preset] ?? false) && level > 5;
}
function getExtractLevel(preset: AutoGenPreset) {
  return extractMapByPresetM[preset] ?? ExtractLevel.M;
}

@ObjectType()
export class InferedSentenceDicConfg {
  @Field()
  @prop()
  allowInitialLetterHint: boolean;

  set setAllowInitialLetterHint(val: boolean) {
    this.allowInitialLetterHint = val;
  }

  constructor(phase: Phases, level: number) {
    this.allowInitialLetterHint = allTrue([
      phase === Phases.Learn,
      phase === Phases.Review,
      level < 5,
    ]);
  }
}

@ObjectType()
export class SentenceDicConfig implements BlockConfigBase {
  dedicatedPoint: number = 3;
  extractLevel: ExtractLevel;
  generate: boolean;
  phase: Phases;

  @Field(() => InferedSentenceDicConfg)
  @prop({ type: () => InferedSentenceDicConfg })
  inferedConfig: InferedSentenceDicConfg;

  public static getGenConfig({
    level,
    preset,
  }: ConfigGeneratorArgs): BlockGenConfig {
    return {
      extractLevel: getExtractLevel(preset),
      genPhases: getGenerate(preset, level) ? allPhases : [],
    };
  }

  constructor({
    level,
    phase,
    genPhases,
    extractLevel,
  }: ConfigConstructorArgs) {
    this.generate = genPhases.includes(phase);
    this.extractLevel = extractLevel;
    this.inferedConfig = new InferedSentenceDicConfg(phase, level);
  }
}
