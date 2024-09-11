import { Model } from './base/Model';
import {
	IProduct,
	IOrder,
	IDeliveryForm,
	IAppState,
	FormErrors,
	IContactForm,
} from '../types';

// Тип для события изменения каталога
export type CatalogChangeEvent = {
	catalog: IProduct[];
};

// Класс AppState управляет состоянием приложения (каталог, корзина, заказ, ошибки формы и т.д.)
export class AppState extends Model<IAppState> {
	// Каталог продуктов
	catalog: IProduct[];
	// Корзина, по умолчанию пустая
	basket: IProduct[] = [];
	// Заказ с предустановленными значениями для полей
	order: IOrder = {
		payment: 'online',  // Метод оплаты по умолчанию - онлайн
		address: '',  // Поле для адреса доставки
		email: '',  // Поле для email
		phone: '',  // Поле для телефона
		total: 0,  // Общая сумма заказа
		items: [],  // Продукты в заказе
	};
	// Поле для хранения идентификатора текущего превью продукта
	preview: string | null;
	// Объект для хранения ошибок формы
	formErrors: FormErrors = {};

	// Метод для очистки корзины
	clearBasket() {
		this.basket = [];
		this.updateBasket();  // Обновляем корзину и уведомляем об изменениях
	}

	// Метод для очистки информации о заказе
	clearOrder() {
		this.order = {
			payment: 'online',
			address: '',
			email: '',
			phone: '',
			total: 0,
			items: [],
		};
	}

	// Устанавливает каталог продуктов и уведомляет об изменении
	setCatalog(items: IProduct[]) {
		this.catalog = items;
		this.emitChanges('items:changed', { catalog: this.catalog });
	}

	// Устанавливает текущий продукт для превью и уведомляет об изменении
	setPreview(item: IProduct) {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}

	// Добавляет продукт в корзину, если его еще нет в корзине
	addToBasket(item: IProduct) {
		if (this.basket.indexOf(item) < 0) {
			this.basket.push(item);
			this.updateBasket();  // Обновляем корзину и уведомляем об изменениях
		}
	}

	// Удаляет продукт из корзины и обновляет состояние
	removeFromBasket(item: IProduct) {
		this.basket = this.basket.filter((it) => it != item);
		this.updateBasket();
	}

	// Обновляет состояние корзины и уведомляет об изменениях
	updateBasket() {
		this.emitChanges('counter:changed', this.basket);  // Обновление счетчика товаров
		this.emitChanges('basket:changed', this.basket);  // Обновление корзины
	}

	// Устанавливает значение поля формы доставки и проверяет валидность
	setDeliveryField(field: keyof IDeliveryForm, value: string) {
		this.order[field] = value;
		// Если форма доставки валидна, то уведомляем о готовности доставки
		if (this.validateDelivery()) {
			this.events.emit('delivery:ready', this.order);
		}
	}

	// Устанавливает значение поля формы контактов и проверяет валидность
	setContactField(field: keyof IContactForm, value: string) {
		this.order[field] = value;
		// Если форма контактов валидна, то уведомляем о готовности
		if (this.validateContact()) {
			this.events.emit('contact:ready', this.order);
		}
	}

	// Валидация данных формы доставки
	validateDelivery() {
		const errors: typeof this.formErrors = {};
		const deliveryRegex = /^[а-яА-ЯёЁa-zA-Z0-9\s\/.,-]{10,}$/;  // Регулярное выражение для проверки адреса доставки
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';  // Сообщение об ошибке, если адрес не указан
		} else if (!deliveryRegex.test(this.order.address)) {
			errors.address =
				'Адрес должен содержать только буквы, цифры, пробелы, точки, запятые и "/", состоять как минимум из 10 символов';  // Сообщение об ошибке, если адрес некорректен
		}
		this.formErrors = errors;  // Сохраняем ошибки в объекте formErrors
		this.events.emit('formErrors:change', this.formErrors);  // Уведомляем об изменениях ошибок формы
		return Object.keys(errors).length === 0;  // Возвращаем true, если ошибок нет
	}

	// Валидация данных формы контактов
	validateContact() {
		const errors: typeof this.formErrors = {};
		const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  // Регулярное выражение для проверки email
		const phoneRegex = /^\+7[0-9]{10}$/;  // Регулярное выражение для проверки телефона в формате +7
		if (!this.order.email) {
			errors.email = 'Необходимо указать email';  // Сообщение об ошибке, если email не указан
		} else if (!emailRegex.test(this.order.email)) {
			errors.email = 'Некорректный адрес электронной почты';  // Сообщение об ошибке, если email некорректен
		}
		let phoneValue = this.order.phone;
		if (phoneValue.startsWith('8')) {
			phoneValue = '+7' + phoneValue.slice(1);  // Преобразуем номер, начинающийся с 8, в формат +7
		}
		if (!phoneValue) {
			errors.phone = 'Необходимо указать телефон';  // Сообщение об ошибке, если телефон не указан
		} else if (!phoneRegex.test(phoneValue)) {
			errors.phone =
				'Некорректный формат номера телефона';  // Сообщение об ошибке, если телефон некорректен
		} else {
			this.order.phone = phoneValue;  // Сохраняем корректный номер телефона
		}
		this.formErrors = errors;  // Сохраняем ошибки в объекте formErrors
		this.events.emit('formErrors:change', this.formErrors);  // Уведомляем об изменениях ошибок формы
		return Object.keys(errors).length === 0;  // Возвращаем true, если ошибок нет
	}
}
