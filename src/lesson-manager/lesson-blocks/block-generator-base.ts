import { TrackBase } from "../../tracks/track.model";
import { BlockGenContext } from "./block-config-base";
import { ILessonBlock } from "./ILessonBlock";

export abstract class BlockGeneratorBase {
  public static async generate(
    ctx: BlockGenContext<TrackBase>
  ): Promise<ILessonBlock[]> {
    console.log(ctx);
    throw new Error("THIS IS ABSTRACT CLASS! CANNOT PROVIDE FUNCTINALITY");
  }
}
