import { TokkenedSubTrack } from "../../tracks/track.model";
import { BlockGenContext } from "../block-config-base";
import { BlockGeneratorBase } from "../block-generator-base";

export class SpeechScrambleGenerator extends BlockGeneratorBase {
  static async generate({
    track,
    vocaCategory,
    lessonConfig,
  }: BlockGenContext<TokkenedSubTrack>) {
    console.log(track, vocaCategory, lessonConfig);
    return [];
  }
}
