import { ObjectType } from "type-graphql";
import { MgBase } from "../../../typed";
import { ILessonBlock } from "../ILessonBlock";

@ObjectType({
  implements: [MgBase, ILessonBlock],
})
export class RolePlayBlock extends ILessonBlock {}
