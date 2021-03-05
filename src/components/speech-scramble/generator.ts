import { TokkenedSubTrack } from "../tracks/track.model";
import { BlockGenContext } from "../lesson-manager/lesson-blocks/IBlockConfig";
import { BlockGeneratorBase } from "../lesson-manager/lesson-blocks/block-generator-base";

export class SpeechScrambleGenerator extends BlockGeneratorBase {
  static async generate({
    track,
    vocaCategory,
    blockConfigMap,
  }: BlockGenContext<TokkenedSubTrack>) {
    console.log(track, vocaCategory, blockConfigMap);
    return [];
  }
}
