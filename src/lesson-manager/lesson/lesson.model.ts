import { modelOptions, prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { LessonTypes, Phases } from "../../enums";
import { ILessonData } from "../lesson-data/base";
import { SoriLessonData } from "../lesson-data/sori/sori-data";
import { LessonBase } from "../lesson.base";

@ObjectType()
@modelOptions({
  schemaOptions: { discriminatorKey: "lessonDataType" },
})
export class Lesson extends LessonBase {
  @Field(() => [Phases])
  @prop({ type: () => [String] })
  phases: Phases[];

  @Field(() => ILessonData)
  @prop({
    type: () => ILessonData,
    discriminators: () => [{ type: SoriLessonData, value: LessonTypes.Sori }],
  })
  lessonData: ILessonData;
}
