import { View } from './base/View';
import { ICard, IActions } from '../types';
import { ensureElement } from '../utils/utils';
import { categoryClasses } from '../utils/constants';

export class Card extends View<ICard> {
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _description?: HTMLElement;
	protected _button?: HTMLButtonElement;
	protected _category?: HTMLElement;
	protected _index?: HTMLElement;
	protected _buttonTitle: string;

	constructor(container: HTMLElement, actions?: IActions) {
		super(container);

		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);
		this._image = container.querySelector('.card__image');
		this._button = container.querySelector('.card__button');
		this._description = container.querySelector('.card__text');
		this._category = container.querySelector('.card__category');
		this._index = container.querySelector('.basket__item-index');

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	disablePurchaseButton(value: number | null) {
		if (!value && this._button) {
			this.setElementDisabled(this._button, true); // Используем метод setDisable вместо this._button.disabled = true;
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set title(value: string) {
		this.setTextContent(this._title, value); // Используем метод setTextContent вместо this._title.textContent = value;
	}

	get title(): string {
		return this._title.textContent || '';
	}

	set price(value: number | null) {
		this.setTextContent(
			this._price,
			value ? `${value.toString()} синапсов` : 'Бесценно'
		);
		this.disablePurchaseButton(value);
	}

	get price(): number {
		return Number(this._price.textContent || '');
	}

	set category(value: string) {
		this.setTextContent(this._category, value);
		this.toggleCssClass(this._category, categoryClasses[value], true); // Используем toggleCssClass вместо classList.add;
	}

	get category(): string {
		return this._category.textContent || '';
	}

	set index(value: string) {
		this.setTextContent(this._index, value); // Используем setTextContent вместо this._index.textContent = value;
	}

	get index(): string {
		return this._index.textContent || '';
	}

	set image(value: string) {
		this.setElementImage(this._image, value, this.title);
	}

	set description(value: string) {
		this.setTextContent(this._description, value); // Используем setTextContent вместо this._description.textContent = value;
	}

	set buttonTitle(value: string) {
		if (this._button) {
			this.setTextContent(this._button, value); // Используем setTextContent вместо this._button.textContent = value;
		}
	}
}
