import type { Task } from './model';

export interface ModalDefinition {
	editTask: {
		visible: boolean;
		data: Task | null;
	};
}

export const modals: ModalDefinition = {
	editTask: {
		visible: false,
		data: null
	}
};
