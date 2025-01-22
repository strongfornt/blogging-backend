export interface IBlockUserPayload {
    userId: string;
    body: {
        isBlocked: boolean;
    }
}