import { ModifierArray, NumberConfigModifier } from "../block-config-base";
import { SentenceDicConfig } from "./config";

export const sentenceDicModifier: ModifierArray<SentenceDicConfig> = [
  new NumberConfigModifier({
    fieldName: "hiddenTokkenLevel",
    modifierName: "학습 중 단어 표시 (%)",
    max: 1,
    min: 0,
  }),
];
