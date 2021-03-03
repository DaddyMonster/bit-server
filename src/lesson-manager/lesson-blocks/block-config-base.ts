import { prop } from "@typegoose/typegoose";
import { createUnionType, Field, Int, ObjectType } from "type-graphql";
import { AutoGenPreset, Phases, VocaCategory } from "../../enums";
import { ExtractLevel } from "../../enums/block-enums/config.enum";
import { TrackBase } from "../../tracks/track.model";
import { LessonConfig } from "../lesson-config";

@ObjectType()
export abstract class BlockConfigBase {
  @Field()
  @prop({ default: false })
  generate: boolean = false;

  @Field(() => ExtractLevel)
  @prop()
  extractLevel: ExtractLevel;

  @Field(() => Int)
  @prop()
  dedicatedPoint: number;
}

export abstract class ConfigByPhase {
  [Phases.Learn]: BlockConfigBase;
  [Phases.Review]?: BlockConfigBase;
  [Phases.Test]?: BlockConfigBase;
}

interface InferedConfigArgs {
  level: number;
  preset: AutoGenPreset;
  phase: Phases;
}

export interface ConfigConstructorArgs<T extends BlockConfigBase> {
  type: "infer" | "direct";
  inferedConfigArgs: InferedConfigArgs;
  directConfigArgs: Partial<T>;
}

interface ConfigFunctionByPhase<T extends BlockConfigBase> {
  [Phases.Learn]: T;
  [Phases.Review]: T;
  [Phases.Test]: T;
}
type ConfigGeneratorFunction<T extends BlockConfigBase> = (
  level: number,
  phases: Phases[]
) => ConfigFunctionByPhase<T>;
export type ConfigGeneratorMap<T extends BlockConfigBase> = {
  [key in AutoGenPreset]?: ConfigGeneratorFunction<T>;
};

export interface BlockGenContext<T extends TrackBase> {
  track: T[];
  vocaCategory: VocaCategory;
  lessonConfig: LessonConfig;
}

@ObjectType()
export class ModifierBase<T> {
  @Field()
  modifierName: string;

  @Field(() => String)
  fieldName: keyof T;
}

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

@ObjectType()
export class MultiSelectOption {
  @Field()
  value: string;

  @Field()
  descriptionKor: string;
}

@ObjectType()
export class MultiselectModifier<T = {}> extends ModifierBase<T> {
  @Field()
  options: MultiSelectOption[];
  constructor(props: MultiselectModifier<T>) {
    super();
    Object.assign(this, props);
  }
}

@ObjectType()
export class BooleanModifier<T = {}> extends ModifierBase<T> {
  constructor(props: BooleanModifier<T>) {
    super();
    Object.assign(this, props);
  }
}

export const ConfigModifierUnioin = createUnionType({
  name: "ConfigModifierUnioin",
  types: () =>
    [NumberConfigModifier, MultiselectModifier, BooleanModifier] as const,
});

export type ModifierArray<T extends BlockConfigBase> = Array<
  MultiselectModifier<T> | BooleanModifier<T> | NumberConfigModifier<T>
>;

export function getConfigFieldModifier<T extends BlockConfigBase>(
  modifierArr: ModifierArray<T>
): ModifierArray<T> {
  return [
    new BooleanModifier<BlockConfigBase>({
      fieldName: "generate",
      modifierName: "생성하기",
    }),
    new NumberConfigModifier<BlockConfigBase>({
      fieldName: "dedicatedPoint",
      modifierName: "부여할 포인트",
      max: 30,
      min: 0,
    }),
    new MultiselectModifier<BlockConfigBase>({
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
