import { prop } from "@typegoose/typegoose";
import { Base } from "@typegoose/typegoose/lib/defaultClasses";
import {
  createUnionType,
  Field,
  ID,
  InputType,
  Int,
  InterfaceType,
  ObjectType,
} from "type-graphql";
import { AutoGenPreset, Phases, VocaCategory } from "../../enums";
import { ExtractLevel } from "../../enums/block-enums/config.enum";
import { AbstactExcutionError } from "../../errors";
import { TrackBase } from "../../tracks";
import { MgIdBase } from "../../typed";
import { BlockConfigMap } from "../lesson-config";
import { RolePlayConfigInfered } from "./role-play/config";

@InterfaceType({
  /* isAbstract: true, */
  resolveType: (val: any) => val.constructor.name,
})
export abstract class IBlockConfig extends MgIdBase {
  public static getGenConfig(args: ConfigGeneratorArgs): BlockGenConfig {
    console.log(args);
    throw new AbstactExcutionError({ methodName: "getGenConfig" });
  }

  @Field(() => Phases)
  @prop()
  phase: Phases;

  @Field()
  @prop({ default: false })
  generate: boolean = false;

  @Field(() => ExtractLevel)
  @prop()
  extractLevel: ExtractLevel;

  @Field(() => Int)
  @prop()
  dedicatedPoint: number;

  inferedConfig: object;
}

@InputType()
export class ConfigGeneratorArgs {
  @Field()
  preset: AutoGenPreset;

  @Field()
  level: number;
}

@ObjectType()
export class BlockGenConfig {
  @Field(() => [Phases])
  genPhases: Phases[];

  @Field(() => ExtractLevel)
  extractLevel: ExtractLevel;
}

@InputType()
export class ConfigConstructorArgs extends BlockGenConfig {
  @Field(() => Phases)
  phase: Phases;

  @Field(() => Int)
  level: number;
}

export const allPhases: Phases[] = [Phases.Learn, Phases.Review, Phases.Test];

export interface BlockGenContext<T extends TrackBase> {
  track: T[];
  vocaCategory: VocaCategory | null;
  blockConfigMap: BlockConfigMap;
  level: number;
  roleInfo: RolePlayConfigInfered | null;
}

/* DEPRECATED BELOW */

export interface ConfigByPhase<T extends IBlockConfig> {
  [Phases.Learn]: T;
  [Phases.Review]: T;
  [Phases.Test]: T;
}
type ConfigGeneratorFunction<T extends IBlockConfig> = (
  level: number,
  phases: Phases[]
) => ConfigByPhase<T>;

export type ConfigGeneratorMap<T extends IBlockConfig> = {
  [key in AutoGenPreset]?: ConfigGeneratorFunction<T>;
};

// DEPRECATE
@ObjectType()
export class ModifierBase<T> {
  @Field()
  modifierName: string;

  @Field(() => String)
  fieldName: keyof T;
}
// DEPRECATE
@ObjectType()
export class NumberConfigModifier<T = {}> extends ModifierBase<T> {
  @Field()
  max: number;

  @Field()
  min: number;
  constructor(props: NumberConfigModifier<T>) {
    super();
    Object.assign({}, props);
  }
}
// DEPRECATE
@ObjectType()
export class MultiSelectOption {
  @Field()
  value: string;

  @Field()
  descriptionKor: string;
}
// DEPRECATE
@ObjectType()
export class MultiselectModifier<T = {}> extends ModifierBase<T> {
  @Field(() => MultiSelectOption)
  options: MultiSelectOption[];
  constructor(props: MultiselectModifier<T>) {
    super();
    Object.assign(this, props);
  }
}

// DEPRECATE
@ObjectType()
export class BooleanModifier<T = {}> extends ModifierBase<T> {
  constructor(props: BooleanModifier<T>) {
    super();
    Object.assign(this, props);
  }
}

// DEPRECATE
export const ConfigModifierUnioin = createUnionType({
  name: "ConfigModifierUnioin",
  types: () =>
    [NumberConfigModifier, MultiselectModifier, BooleanModifier] as const,
});

// DEPRECATE
export type ModifierArray<T extends IBlockConfig> = Array<
  MultiselectModifier<T> | BooleanModifier<T> | NumberConfigModifier<T>
>;

// DEPRECATE
export function getConfigFieldModifier<T extends IBlockConfig>(
  modifierArr: ModifierArray<T>
): ModifierArray<T> {
  return [
    new BooleanModifier<IBlockConfig>({
      fieldName: "generate",
      modifierName: "생성하기",
    }),
    new NumberConfigModifier<IBlockConfig>({
      fieldName: "dedicatedPoint",
      modifierName: "부여할 포인트",
      max: 30,
      min: 0,
    }),
    new MultiselectModifier<IBlockConfig>({
      fieldName: "extractLevel",
      modifierName: "자동생성 중요도",
      options: [
        { descriptionKor: "높음", value: ExtractLevel.H },
        { descriptionKor: "보통", value: ExtractLevel.M },
        { descriptionKor: "낮음", value: ExtractLevel.L },
      ],
    }),
    ...modifierArr,
  ];
}
