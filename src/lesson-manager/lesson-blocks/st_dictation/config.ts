import { prop } from "@typegoose/typegoose";
import { Field, Float, ObjectType } from "type-graphql";
import { ExtractLevel, Phases } from "../../../enums";
import { getHiddenTok, hasItem } from "../../../util/lesson-config-util";
import {
  BlockConfigBase,
  ConfigByPhase,
  ConfigConstructorArgs,
  ConfigGeneratorMap,
} from "../block-config-base";
import { GetConfigArgs } from "../ILessonBlock";

@ObjectType()
export class SentenceDicConfigByPhase implements ConfigByPhase {
  @Field(() => SentenceDicConfig)
  @prop({ type: () => SentenceDicConfig })
  [Phases.Learn]: SentenceDicConfig;

  @Field(() => SentenceDicConfig, { nullable: true })
  @prop({ type: () => SentenceDicConfig })
  [Phases.Review]?: SentenceDicConfig;

  @Field(() => SentenceDicConfig, { nullable: true })
  @prop({ type: () => SentenceDicConfig })
  [Phases.Test]?: SentenceDicConfig;
}

@ObjectType()
export class SentenceDicConfig extends BlockConfigBase {
  static getConfigByPhase({ level, phases, preset }: GetConfigArgs) {
    phases.map((x) => {});
  }

  dedicatedPoint: number = 2;
  extractLevel = ExtractLevel.M;
  generate: boolean = false;

  @Field(() => Float)
  @prop()
  hiddenTokkenLevel: number;

  constructor({
    directConfigArgs,
    inferedConfigArgs,
    type,
  }: ConfigConstructorArgs<SentenceDicConfig>) {
    super();
    if (type === "infer") {
      console.log(inferedConfigArgs);
      // INFERED FIELD LOGIC
    } else {
      Object.assign(this, directConfigArgs);
    }
  }
}

/* export const sentenceDicConfigMap: ConfigGeneratorMap<SentenceDicConfig> = {
  "sori-full": (lv, phases) => {},
  "sori-light": () => justDont,
  "sori-role-aid": () => justDont,
  "sori-standard": (lv, phases) => {
    return {
      learn: create({ extractLevel: ExtractLevel.L }),
      review: hasItem(phases, Phases.Review)
        ? create({
            extractLevel: ExtractLevel.L,
            hiddenTokkenLevel: Math.min(getHiddenTok(lv) + 0.3, 1),
          })
        : dont(),
      test: hasItem(phases, Phases.Test)
        ? create({ extractLevel: ExtractLevel.L })
        : dont(),
    };
  },
};
 */
