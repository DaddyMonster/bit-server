import { prop } from "@typegoose/typegoose";
import { Field, Float, Int, ObjectType } from "type-graphql";
import { BlockConfigBase, ConfigGeneratorMap } from "../block-config-base";

interface Props extends Partial<SpeechScrambleConfig> {}

@ObjectType()
export class SpeechScrambleConfig extends BlockConfigBase {
  generate: boolean = false;
  extractLevel: number = 1;
  // 1 : FULL
  // 2 : key sentences + role
  // 3 : role

  @Field(() => Float)
  @prop({ default: 1 })
  sensitivity: number = 1;

  @Field()
  @prop({ default: true })
  allowMouse: boolean = true;

  @Field(() => Int)
  @prop({ default: 1 })
  tokkenGroupLevel: number = 1;
  // 1 = break by word
  // 2 = break by phrase
  // 3 = break by ie

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
    tokkenGroupLevel: lv < 3 ? 3 : lv < 7 ? 2 : 1,
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
      extractLevel: 1,
    }),
  "sori-light": (lv) =>
    new SpeechScrambleConfig({
      ...configGenByLv(lv),
      extractLevel: 2,
    }),
  "sori-role-aid": (_) =>
    new SpeechScrambleConfig({
      generate: false,
    }),
  "sori-standard": (lv) =>
    new SpeechScrambleConfig({ ...configGenByLv(lv), extractLevel: 1 }),
};
