import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Field, ID, Int, InterfaceType, ObjectType } from "type-graphql";
import {
  ILessonBlock,
  LessonBlockBaseModel,
} from "../lesson-blocks/ILessonBlock";
import { Lesson, LessonModel } from "../lesson-manager/lesson.model";
import { MgBase } from "../typed/mg.model.base";

@InterfaceType({
  resolveType: (val: any) => val.constructor.name,
})
export abstract class IProgressBlock extends MgBase {
  @Field(() => Lesson)
  lesson: Lesson;

  @Field(() => ID)
  @prop({ ref: () => LessonModel })
  lessonRef: Ref<Lesson>;

  @Field(() => Int)
  @prop()
  dedicatedPoint: number;

  @Field(() => Int)
  @prop()
  gainedPoint: number;

  @Field()
  complete: boolean;

  @Field(() => ILessonBlock)
  @prop({ ref: () => LessonBlockBaseModel })
  blockRef: Ref<ILessonBlock>;
}
@ObjectType()
export class ProgressBase extends IProgressBlock {}
export const ProgressBaseModel = getModelForClass(ProgressBase);
