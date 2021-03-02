import { TrackBase } from "../tracks/track.model";
import { BlockGenContext } from "./block-config-base";
import { ILessonBlock } from "./ILessonBlock";
import { SpeechScrambleConfig } from "./speech-scramble/config";

export abstract class BlockGeneratorBase {
  public static async generate(
    ctx: BlockGenContext<TrackBase>,
    config: SpeechScrambleConfig
  ): Promise<ILessonBlock[]> {
    console.log(ctx, config);
    throw new Error("THIS IS ABSTRACT CLASS! CANNOT PROVIDE FUNCTINALITY");
  }
}
