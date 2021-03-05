import { Field, InterfaceType } from "type-graphql";
import { LessonTypes } from "../../enums";
import { MgBase } from "../../typed";

@InterfaceType({
  isAbstract: true,
  resolveType: (val: any) => val.constructor.name,
})
export abstract class ILessonData extends MgBase {
  @Field(() => LessonTypes)
  type: LessonTypes;
}
