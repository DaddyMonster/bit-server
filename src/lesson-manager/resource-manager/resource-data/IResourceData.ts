import { prop } from "@typegoose/typegoose";
import { Field, InterfaceType } from "type-graphql";
import { ResourceTypes } from "../../../enums";
import { MgBase } from "../../../typed/mg.model.base";

@InterfaceType({
  resolveType: (val: any) => val.constructor.name,
  isAbstract: true,
  implements: MgBase,
})
export class IResourceData extends MgBase {
  @Field(() => ResourceTypes)
  @prop()
  type: ResourceTypes;
}
