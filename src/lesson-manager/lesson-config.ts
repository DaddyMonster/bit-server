import { prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { BlockType } from "../enums";
import { BlockConfigBase } from "./lesson-blocks/block-config-base";
import { SpeechScrambleConfig } from "./lesson-blocks/speech-scramble/config";
import { SentenceDicConfig } from "./lesson-blocks/st_dictation/config";

export interface BlockTrackRef {
  trackId: string;
}

type LessonBlockConfigType = {
  [key in BlockType]: BlockConfigBase | null;
};

@ObjectType()
export class LessonConfig implements LessonBlockConfigType {
  @Field(() => SpeechScrambleConfig, { nullable: true })
  @prop({ type: () => SpeechScrambleConfig })
  [BlockType.st_sc]: SpeechScrambleConfig | null;

  @Field({ nullable: true })
  @prop({ type: () => SpeechScrambleConfig })
  [BlockType.rp]: SpeechScrambleConfig | null;

  @Field({ nullable: true })
  @prop({ type: () => SentenceDicConfig })
  [BlockType.st_dic]: SentenceDicConfig | null;

  @Field({ nullable: true })
  @prop({ type: () => SpeechScrambleConfig })
  [BlockType.st_ph]: SpeechScrambleConfig | null;

  @Field({ nullable: true })
  @prop({ type: () => SpeechScrambleConfig })
  [BlockType.st_rd]: SpeechScrambleConfig | null;

  @Field({ nullable: true })
  @prop({ type: () => SpeechScrambleConfig })
  [BlockType.voc]: SpeechScrambleConfig | null;

  @Field({ nullable: true })
  @prop({ type: () => SpeechScrambleConfig })
  [BlockType.voc_lit]: SpeechScrambleConfig | null;

  @Field({ nullable: true })
  @prop({ type: () => SpeechScrambleConfig })
  [BlockType.voc_pat]: SpeechScrambleConfig | null;

  @Field({ nullable: true })
  @prop({ type: () => SpeechScrambleConfig })
  [BlockType.voc_pho]: SpeechScrambleConfig | null;

  @Field({ nullable: true })
  @prop({ type: () => SpeechScrambleConfig })
  [BlockType.voc_dic]: SpeechScrambleConfig | null;

  @Field({ nullable: true })
  @prop({ type: () => SpeechScrambleConfig })
  [BlockType.ww]: SpeechScrambleConfig | null;
}
