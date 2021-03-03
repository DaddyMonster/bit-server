import { prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { MgBase } from "../../../typed/mg.model.base";
import { getConfigFieldModifier } from "../block-config-base";
import { GetConfigArgs, ILessonBlock } from "../ILessonBlock";
import { SentenceDicConfigByPhase } from "./config";
import { SentenceDicGenerator } from "./generator";
import { sentenceDicModifier } from "./modifier";

@ObjectType({ implements: [MgBase, ILessonBlock] })
export class SentenceDicBlock extends ILessonBlock {
  static getConfig({ level, phases, preset }: GetConfigArgs) {
    // Invoke Config class static method
  }

  static getConfigFieldModifier() {
    return getConfigFieldModifier(sentenceDicModifier);
  }

  static generator = SentenceDicGenerator.generate;

  @Field(() => SentenceDicConfigByPhase)
  @prop({ type: () => SentenceDicConfigByPhase })
  config: SentenceDicConfigByPhase;
}
