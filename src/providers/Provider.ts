import { Piece, PieceContext } from "@sapphire/framework";

export class Provider<O extends ProviderOptions = ProviderOptions> extends Piece<O> {
    public url?: string;

    constructor(context: PieceContext, options: O = {} as O) {
        super(context, options);

        this.url = options.url;
    }
}

export interface ProviderOptions extends Piece.Options {
    readonly url?: string;
}