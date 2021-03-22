declare type MSG_TYPE = '' | 'INFO' | 'SUCC' | 'WARN' | 'ERR' | undefined | null;
export declare function bline(): void;
export declare function tEcho(msg: any, title?: string, type?: MSG_TYPE): void;
export {};
