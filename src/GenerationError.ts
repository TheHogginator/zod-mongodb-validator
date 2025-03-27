export class GenerationError extends Error {
    constructor(message: string, path: string[]) {
        super(message);
        this.name = 'GenerationError'
        // @ts-expect-error
        this.zodPath = path.join('');
    }
}
