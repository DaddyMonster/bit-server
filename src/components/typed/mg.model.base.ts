import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { Field, ID, InterfaceType } from "type-graphql";

@InterfaceType()
export abstract class MgIdBase implements Base<string> {
  @Field(() => ID)
  _id: string;
}

@InterfaceType({ implements: MgIdBase })
export abstract class MgBase extends MgIdBase implements TimeStamps {
  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
