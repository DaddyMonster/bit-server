import { prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { MgBase } from "../../../typed/mg.model.base";
import { getConfig, getConfigFieldModifier } from "../block-config-base";
import { GetConfigArgs, ILessonBlock } from "../ILessonBlock";
import { SentenceDicConfigByPhase, sentenceDicConfigMap } from "./config";
import { SentenceDicGenerator } from "./generator";
import { sentenceDicModifier } from "./modifier";

@ObjectType({ implements: [MgBase, ILessonBlock] })
export class SentenceDicBlock extends ILessonBlock {
  static getConfig({ level, phases, preset }: GetConfigArgs) {
    return getConfig({
      preset,
      phases,
      level,
      configMap: sentenceDicConfigMap,
    });
  }

  static getConfigFieldModifier() {
    return getConfigFieldModifier(sentenceDicModifier);
  }

  static generator = SentenceDicGenerator.generate;

  @Field(() => SentenceDicConfigByPhase)
  @prop({ type: () => SentenceDicConfigByPhase })
  config: SentenceDicConfigByPhase;
}
