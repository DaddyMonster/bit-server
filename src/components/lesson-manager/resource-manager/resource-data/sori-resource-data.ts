import { prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { IResourceData } from "./IResourceData";

@ObjectType({ implements: IResourceData })
export class SoriResourceData extends IResourceData {
  @Field()
  @prop()
  vidUrl: string;
}
