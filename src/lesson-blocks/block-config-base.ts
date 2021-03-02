import { prop } from "@typegoose/typegoose";
import { Field, Int, ObjectType } from "type-graphql";
import { AutoGenPreset, Phases, VocaCategory } from "../enums";
import { LessonConfig } from "../lesson-manager/lesson-config-base";
import { TrackBase } from "../tracks/track.model";

@ObjectType()
export abstract class BlockConfigBase {
  @Field()
  @prop({ default: false })
  generate: boolean = false;

  @Field(() => Int)
  @prop()
  extractLevel: number;
}
type ConfigGeneratorFunction<T extends BlockConfigBase> = (
  level: number,
  phases: Phases[]
) => T;
export type ConfigGeneratorMap<T extends BlockConfigBase> = {
  [key in AutoGenPreset]?: ConfigGeneratorFunction<T>;
};

interface GetConfigByPresetProps<T extends BlockConfigBase> {
  configMap: ConfigGeneratorMap<T>;
  preset: AutoGenPreset;
  phases: Phases[];
  level: number;
}

export function getConfigByPreset<T extends BlockConfigBase>({
  configMap,
  level,
  phases,
  preset,
}: GetConfigByPresetProps<T>) {
  const configGenerator = configMap[preset];
  if (!configGenerator) {
    return null;
  }
  return configGenerator(level, phases);
}

export interface BlockGenContext<T extends TrackBase> {
  track: T[];
  vocaCategory: VocaCategory;
  config: LessonConfig;
}
