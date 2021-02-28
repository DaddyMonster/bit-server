import { Base } from "@typegoose/typegoose/lib/defaultClasses";
import { ObjectType } from "type-graphql";

@ObjectType()
export class Lemma implements Base<string> {
  _id: string;
}
