import { getModelForClass, modelOptions } from "@typegoose/typegoose";
import { Base } from "@typegoose/typegoose/lib/defaultClasses";
import { ObjectType } from "type-graphql";

@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
export class Draft implements Base<string> {
  _id: string;

  
}
