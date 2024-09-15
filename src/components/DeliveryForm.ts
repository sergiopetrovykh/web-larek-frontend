import { Form } from './common/Form';
import { IDeliveryForm, IContactForm, IActions } from '../types';
import { IEvents } from '../types';
import { ensureElement } from '../utils/utils';

export class DeliveryForm extends Form<IDeliveryForm> {
	protected _cardButton: HTMLButtonElement;
	protected _cashButton: HTMLButtonElement;
	protected _selectedPayment: string = ''; // Хранит выбранный способ оплаты

	constructor(container: HTMLFormElement, events: IEvents, actions?: IActions) {
		super(container, events);

		this._cardButton = ensureElement<HTMLButtonElement>(
			'button[name="card"]',
			this.container
		);
		this._cashButton = ensureElement<HTMLButtonElement>(
			'button[name="cash"]',
			this.container
		);
		this.toggleCssClass(this._cardButton, 'button_alt-active', true); // По умолчанию активен способ оплаты картой

		// Добавляем обработчики событий на кнопки
		if (actions?.onClick) {
			this._cardButton.addEventListener('click', actions.onClick);
			this._cashButton.addEventListener('click', actions.onClick);
		}
	}

	// Метод для переключения состояния кнопок
	togglePaymentButtons(target: HTMLElement) {
		if (target === this._cardButton) {
			this.toggleCssClass(this._cardButton, 'button_alt-active', true);
			this.toggleCssClass(this._cashButton, 'button_alt-active', false);
			this._selectedPayment = 'card'; // Устанавливаем способ оплаты "карта"
		} else if (target === this._cashButton) {
			this.toggleCssClass(this._cardButton, 'button_alt-active', false);
			this.toggleCssClass(this._cashButton, 'button_alt-active', true);
			this._selectedPayment = 'cash'; // Устанавливаем способ оплаты "наличные"
		}
	}

	// Метод для получения выбранного способа оплаты
	getSelectedPayment(): string {
		return this._selectedPayment;
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value = value;
	}
}

export class ContactForm extends Form<IContactForm> {
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
	}

	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value = value;
	}
}
