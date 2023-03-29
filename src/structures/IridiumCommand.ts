import { Args, Command, CommandOptions, PieceContext } from "@sapphire/framework";

export class IridiumCommand<PreParseReturn = Args, O extends IridiumCommandOptions = IridiumCommandOptions> extends Command<PreParseReturn, O> {
    public module: string | null;
    constructor(context: PieceContext, options: O = {} as O) {
        super(context, options);

        this.module = options.module ?? null;
    }
} 

export interface IridiumCommandOptions extends CommandOptions {
    module?: string;
}