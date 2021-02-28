import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { InterfaceType } from "type-graphql";

@InterfaceType({
  resolveType: (val: any) => val.constructor.name,
})
export abstract class IProgressBlock implements Base<string>, TimeStamps {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
