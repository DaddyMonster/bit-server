import { AbstactExcutionError } from "../../errors/AbstractExcutionError";
import { TrackBase } from "../../tracks";
import { BlockGenContext } from "./IBlockConfig";
import { ILessonBlock } from "./ILessonBlock";

export abstract class BlockGeneratorBase<T extends TrackBase> {
  ctx: BlockGenContext<T>;
  constructor(ctx: BlockGenContext<T>) {
    this.ctx = ctx;
  }

  public async generate(_: any, __: any): Promise<ILessonBlock[]> {
    throw new AbstactExcutionError({
      methodName: `[BlockGenerator][generate]`,
    });
  }

  public async extract(): Promise<ILessonBlock[]> {
    throw new AbstactExcutionError({
      methodName: `[BlockGenerator][extract]`,
    });
  }
}
