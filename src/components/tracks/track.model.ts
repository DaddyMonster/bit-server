import { prop } from "@typegoose/typegoose";
import { Field, Float, Int, ObjectType } from "type-graphql";
import { MgIdBase } from "../typed";

@ObjectType()
export class Tokken {
  @Field()
  tokken: string;

  @Field(() => Int)
  refIdx: number;

  @Field()
  pos: string;
}

@ObjectType()
export class TrackBase {
  @Field()
  @prop()
  sentence: string;

  @Field()
  @prop()
  korSentence: string;
}

@ObjectType()
export class TokkenTrack extends TrackBase {
  @Field(() => [Tokken])
  @prop()
  tokkens: Tokken[];
}

@ObjectType()
export class SubTrack extends TrackBase implements MgIdBase {
  @Field()
  _id: string;

  @Field(() => Float)
  @prop()
  startTime: number;

  @Field(() => Float)
  @prop()
  endTime: number;
}

@ObjectType()
export class TokkenedSubTrack extends SubTrack {
  @Field(() => [Tokken])
  @prop()
  tokkens: Tokken[];
}

@ObjectType()
export class ExtendedTrack extends TokkenedSubTrack {
  @Field()
  @prop()
  depParsed: string;
}
