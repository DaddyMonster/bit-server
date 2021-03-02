import { TokkenGroupLevel } from "../../enums/block-enums";
import {
  BooleanModifier,
  MultiselectModifier,
  NumberConfigModifier,
} from "../block-config-base";
import { SpeechScrambleConfig } from "./config";

export const speechScrambleModifiers = [
  new BooleanModifier<SpeechScrambleConfig>({
    fieldName: "allowMouse",
    modifierName: "마우스 스크램블 허용",
  }),
  new MultiselectModifier<SpeechScrambleConfig>({
    fieldName: "tokkenGroupLevel",
    modifierName: "스크램블 문자 표시",
    options: [
      { descriptionKor: "단어 단위", value: TokkenGroupLevel.Word },
      { descriptionKor: "구 단위", value: TokkenGroupLevel.Phrase },
      { descriptionKor: "의미 단위", value: TokkenGroupLevel.Ie },
    ],
  }),
  new NumberConfigModifier<SpeechScrambleConfig>({
    fieldName: "hiddenTokkenLevel",
    max: 1,
    min: 0,
    modifierName: "단어 표시 (%)",
  }),
];
