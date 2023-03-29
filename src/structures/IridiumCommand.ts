import { Args, Command, CommandOptions, PieceContext } from "@sapphire/framework";

export class IridiumCommand<PreParseReturn = Args, O extends IridiumCommandOptions = IridiumCommandOptions> extends Command<PreParseReturn, O> {
    constructor(context: PieceContext, options: O = {} as O) {
        super(context, options);
    }
} 

export interface IridiumCommandOptions extends CommandOptions {
    module?: string;
}