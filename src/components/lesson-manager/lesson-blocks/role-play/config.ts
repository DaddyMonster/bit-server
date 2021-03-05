import { prop } from "@typegoose/typegoose";
import { Field, Int, ObjectType } from "type-graphql";
import {
  ExtractLevel,
  RoleFinalRecordType,
  RolePlayType,
} from "../../../enums";
import { IBlockConfig } from "../IBlockConfig";

@ObjectType()
export class RolePlayConfigInfered {
  @Field(() => RolePlayType)
  @prop()
  rolePlayType: RolePlayType;

  @Field(() => RoleFinalRecordType)
  @prop()
  roleFinalRecordType: RoleFinalRecordType;

  @Field(() => Int)
  @prop()
  trackStart: number;

  @Field(() => Int)
  @prop()
  trackEnd: number;
}

@ObjectType()
export class RolePlayConfig extends IBlockConfig {
  dedicatedPoint = 5;

  extractLevel = ExtractLevel.L; // MEANINGLESS...

  generate = true;

  inferedConfig: RolePlayConfigInfered;
}
