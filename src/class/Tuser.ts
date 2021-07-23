import type { IUserBase, nullLike } from '../types';

class Tuser implements IUserBase {
	id: number;
	pid: number;
	code: string;
	name: string;
	namezh: string;
	nickName: string
	gender: number;
	avator: string;
	authStr: string;
	constructor(payload?: IUserBase | nullLike) {
		this.id = payload?.id || -1;
		this.pid = payload?.pid || -1;
		this.code = payload?.code || '';
		this.name = payload?.name || '';
		this.namezh = payload?.namezh || '';
		this.nickName = payload?.nickName || '';
		this.gender = payload?.gender || 1;
		this.avator = payload?.avator || '';
		this.authStr = payload?.authStr || '';
	}
}

export default Tuser;
