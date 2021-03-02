import { prop } from "@typegoose/typegoose";
import { Field, Float, Int, ObjectType } from "type-graphql";
import { ExtractLevel, TokkenGroupLevel } from "../../enums/block-enums/";

import { BlockConfigBase, ConfigGeneratorMap } from "../block-config-base";

interface Props extends Partial<SpeechScrambleConfig> {}

@ObjectType()
export class SpeechScrambleConfig extends BlockConfigBase {
  generate: boolean = false;
  extractLevel: ExtractLevel = ExtractLevel.H;
  // 1 : FULL
  // 2 : key sentences + role
  // 3 : role

  dedicatedPoint: number = 3;

  @Field(() => Float)
  @prop({ default: 1 })
  sensitivity: number = 1;

  @Field()
  @prop({ default: true })
  allowMouse: boolean = true;

  @Field(() => Int)
  @prop({ default: 1 })
  tokkenGroupLevel: TokkenGroupLevel = TokkenGroupLevel.Word;

  @Field(() => Float)
  @prop({ default: 0 })
  hiddenTokkenLevel: number = 0;

  constructor(props: Props) {
    super();
    Object.assign(this, props);
  }
}

const configGenByLv = (lv: number) => {
  const configObj: Partial<SpeechScrambleConfig> = {
    allowMouse: true,
    tokkenGroupLevel:
      lv < 3
        ? TokkenGroupLevel.Ie
        : lv < 7
        ? TokkenGroupLevel.Phrase
        : TokkenGroupLevel.Word,
    sensitivity: 1,
    hiddenTokkenLevel: lv < 3 ? 0 : lv < 7 ? 0.5 : 0.3,
    generate: true,
  };
  return configObj;
};

export const speechScrambleConfigs: ConfigGeneratorMap<SpeechScrambleConfig> = {
  "sori-full": (lv) =>
    new SpeechScrambleConfig({
      ...configGenByLv(lv),
      extractLevel: ExtractLevel.H,
    }),
  "sori-light": (lv) =>
    new SpeechScrambleConfig({
      ...configGenByLv(lv),
      extractLevel: ExtractLevel.M,
    }),
  "sori-role-aid": (_) =>
    new SpeechScrambleConfig({
      generate: false,
    }),
  "sori-standard": (lv) =>
    new SpeechScrambleConfig({
      ...configGenByLv(lv),
      extractLevel: ExtractLevel.H,
    }),
};
