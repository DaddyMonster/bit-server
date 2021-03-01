import { getModelForClass } from "@typegoose/typegoose";
import { InterfaceType, ObjectType } from "type-graphql";
import { MgBase } from "../typed/mg.model.base";
InterfaceType({
  resolveType: (val: any) => val.constructor.name,
  implements: MgBase,
});
export abstract class IResource extends MgBase {}

@ObjectType()
export class ResourceBase extends IResource {}
export const ResourceBaseModel = getModelForClass(ResourceBase);
