declare type MSG_TYPE = '' | 'INFO' | 'WARN' | 'ERR' | undefined | null;
declare function echo(msg: string | Error, title?: string, type?: MSG_TYPE): void;
export default echo;
