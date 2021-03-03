import { TokkenTrack } from "../../../tracks/track.model";
import { BlockGenContext } from "../block-config-base";
import { BlockGeneratorBase } from "../block-generator-base";

export class SentenceDicGenerator extends BlockGeneratorBase {
  static async generate(ctx: BlockGenContext<TokkenTrack>) {
    return [];
  }
}
