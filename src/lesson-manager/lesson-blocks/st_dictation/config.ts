import { prop } from "@typegoose/typegoose";
import { Field, Float, ObjectType } from "type-graphql";
import { ExtractLevel, Phases } from "../../../enums";
import { getHiddenTok, hasItem } from "../../../util/lesson-config-util";
import {
  BlockConfigBase,
  ConfigByPhase,
  ConfigGeneratorMap,
} from "../block-config-base";

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
  dedicatedPoint: number = 2;
  extractLevel = ExtractLevel.M;
  generate: boolean = false;

  @Field(() => Float)
  @prop()
  hiddenTokkenLevel: number;

  constructor(props?: Partial<SentenceDicConfig>) {
    super();
    Object.assign(this, props);
  }
}

const create = (ops: Partial<SentenceDicConfig>) => new SentenceDicConfig(ops);
const dont = () => new SentenceDicConfig({ generate: false });
const justDont = {
  [Phases.Learn]: dont(),
  [Phases.Review]: dont(),
  [Phases.Test]: dont(),
};
export const sentenceDicConfigMap: ConfigGeneratorMap<SentenceDicConfig> = {
  "sori-full": (lv, phases) => {
    return {
      learn: create({
        hiddenTokkenLevel: getHiddenTok(lv),
      }),
      review: hasItem(phases, Phases.Review)
        ? create({
            hiddenTokkenLevel: Math.min(getHiddenTok(lv) + 0.3, 1),
          })
        : dont(),
      test: hasItem(phases, Phases.Test)
        ? create({ hiddenTokkenLevel: 1 })
        : dont(),
    };
  },
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
