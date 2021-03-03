import { modelOptions, prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { LessonTypes, StepStateStatus } from "../../enums";
import { MgBase } from "../../typed/mg.model.base";
import { ILessonData } from "../lesson-data/base";
import { SoriLessonData } from "../lesson-data/sori/sori-data";
import { LessonBase } from "../lesson.base";

@ObjectType()
export class StepStates {
  @Field()
  range: StepStateStatus;

  @Field()
  block: StepStateStatus;
}

@ObjectType({ implements: [MgBase, LessonBase] })
@modelOptions({
  schemaOptions: { timestamps: true, toObject: { virtuals: true } },
})
export class Draft extends LessonBase {
  @Field(() => StepStates)
  @prop()
  stepState: StepStates;

  @Field(() => ILessonData, { nullable: true })
  @prop({
    type: () => ILessonData,
    discriminators: () => [{ type: SoriLessonData, value: LessonTypes.Sori }],
  })
  draftData: ILessonData | null;

  @Field()
  @prop()
  isReady: boolean;
}
