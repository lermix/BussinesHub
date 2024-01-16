import { requests } from './agent';
import { Store } from '../Models/Store';

export const ApiStore = {
	UpdateStore: (store: Store): Promise<Store> => requests.post(`Store/UpdateStore`, store),
};
