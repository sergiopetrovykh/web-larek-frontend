import { View } from './base/View';
import { createElement, ensureElement } from '../utils/utils';
import { IBasketView } from '../types';
import { EventEmitter } from './base/events';

export class BasketView extends View<IBasketView> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._total = ensureElement<HTMLElement>('.basket__price', this.container);
		this._button = ensureElement<HTMLButtonElement>('.basket__button', this.container);

		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit('order:open');
			});
		}

		this.items = [];
		this.toggleSubmitButton(true); // Используем метод toggleSubmitButton вместо установки disabled напрямую
	}

	toggleSubmitButton(isDisabled: boolean) {
		this.setElementDisabled(this._button, isDisabled); // Используем метод setElementDisabled из родительского класса Component
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
		}
	}

	set totalPrice(total: number) {
		this.setTextContent(this._total, `${total} синапсов`);
	}
}
