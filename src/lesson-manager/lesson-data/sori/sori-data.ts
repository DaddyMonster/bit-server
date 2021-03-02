import { prop } from "@typegoose/typegoose";
import { Field, Float, ObjectType } from "type-graphql";
import { VideoTypes } from "../../../enums/sori-lesson-enum";
import { TokkenedSubTrack } from "../../../tracks/track.model";
import { ILessonData } from "../base";

@ObjectType({ implements: ILessonData })
export class SoriLessonData extends ILessonData {
  @Field()
  @prop()
  readonly vidUrl: string;

  @Field(() => [TokkenedSubTrack])
  @prop({ type: () => [TokkenedSubTrack] })
  readonly subtitle: TokkenedSubTrack[];

  @Field(() => VideoTypes)
  @prop()
  readonly videoType: VideoTypes;

  @Field(() => Float)
  @prop()
  readonly videoStart: number;

  @Field(() => Float)
  @prop()
  readonly videoEnd: number;
}
