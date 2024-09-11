/**
 * Базовый компонент
 */
export abstract class View<T> {
	protected constructor(protected readonly container: HTMLElement) {
		// Учитывайте что код в конструкторе исполняется ДО всех объявлений в дочернем классе
	}

	// Инструментарий для работы с DOM в дочерних компонентах

	// Переключить класс
	toggleCssClass(element: HTMLElement, className: string, force?: boolean) {
		element.classList.toggle(className, force);
	}

	// Установить текстовое содержимое
	protected setTextContent(element: HTMLElement, value: unknown) {
		if (element) {
			element.textContent = String(value);
		}
	}

	// Сменить статус блокировки
	setElementDisabled(element: HTMLElement, state: boolean) {
		if (element) {
			if (state) element.setAttribute('disabled', 'disabled');
			else element.removeAttribute('disabled');
		}
	}

	// Скрыть
	protected hideElement(element: HTMLElement) {
		element.style.display = 'none';
	}

	// Показать
	protected showElement(element: HTMLElement) {
		element.style.removeProperty('display');
	}

	// Установить изображение с альтернативным текстом
	protected setElementImage(element: HTMLImageElement, src: string, alt?: string) {
		if (element) {
			element.src = src;
			if (alt) {
				element.alt = alt;
			}
		}
	}

	// Вернуть корневой DOM-элемент
	render(data?: Partial<T>): HTMLElement {
		Object.assign(this as object, data ?? {});
		return this.container;
	}
}
