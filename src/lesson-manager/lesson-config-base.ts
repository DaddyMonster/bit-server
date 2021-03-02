import { prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { BlockType, LessonTypes } from "../enums";
import { BlockConfigBase } from "../lesson-blocks/block-config-base";
import { SpeechScrambleConfig } from "../lesson-blocks/speech-scramble/config";

type AvailBlockLists = {
  [key in LessonTypes]: BlockType[];
};

export interface BlockTrackRef {
  trackId: string;
}

export const availBlockLists: AvailBlockLists = {
  sori: [
    BlockType.ww,
    BlockType.st_sc,
    BlockType.st_ph,
    BlockType.st_dic,
    BlockType.rp,
    BlockType.voc_pat,
    BlockType.voc_lit,
  ],
  book: [],
  text: [],
  vid: [],
  voca: [],
};

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
  @prop({ type: () => SpeechScrambleConfig })
  [BlockType.st_dic]: SpeechScrambleConfig | null;

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
