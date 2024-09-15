// src/types/index.ts

// Перечисление типов событий
export type EventName = string | RegExp;

// Типы подписчиков и событий
export type Subscriber = Function;
export type EmitterEvent = {
	eventName: string;
	data: unknown;
};

// Интерфейс для событийного брокера
export interface IEvents {
	on<T extends object>(event: EventName, callback: (data: T) => void): void;
	emit<T extends object>(event: string, data?: T): void;
	trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}

// Тип ответа от сервера для списка объектов
export type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};

// Типы для методов POST, PUT, DELETE
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

// Интерфейс API-клиента
export interface ILarekAPI {
	fetchProductList: () => Promise<IProduct[]>;
	fetchProductDetails: (id: string) => Promise<IProduct>;
	submitOrder: (order: IOrder) => Promise<IOrderResult>;
}

// Интерфейс продукта, как он приходит с API
export interface IProduct {
	id: string;
	title: string;
	price: number | null;
	description: string;
	category: string;
	image: string;
}

// Состояние приложения
export interface IAppState {
	catalog: IProduct[];
	basket: IProduct[];
	preview: string | null;
	delivery: IDeliveryForm | null;
	contact: IContactForm | null;
	order: IOrder | null;
}

// Интерфейс для формы доставки
export interface IDeliveryForm {
	payment: string;
	address: string;
}

// Интерфейс для контактной информации
export interface IContactForm {
	email: string;
	phone: string;
}

// Интерфейс для заказа
export interface IOrder extends IDeliveryForm, IContactForm {
	total: number;
	items: string[];
}

// Интерфейс для ответа сервера при создании заказа
export interface IOrderResult {
	id: string;
	total: number;
}

// Тип для ошибок в форме
export type FormErrors = Partial<Record<keyof IOrder, string>>;

// Данные для отображения страницы
export interface IPage {
	counter: number;
	catalog: HTMLElement[];
}

// Данные для отображения карточки товара
export interface ICard extends IProduct {
	index?: string;
	buttonTitle?: string;
}

// Данные для отображения успешного заказа
export interface ISuccess {
	total: number;
}

// Действия, передаваемые в конструктор элементов
export interface IActions {
	onClick: (event: MouseEvent) => void;
}

// Действия для успешного заказа
export interface ISuccessActions {
	onClick: () => void;
}

// Данные для отображения корзины
export interface IBasketView {
	items: HTMLElement[];
	total: number;
}

// Данные для модального окна
export interface IModalData {
	content: HTMLElement;
}

// Состояние формы (валидность и ошибки)
export interface IFormState {
	valid: boolean;
	errors: string[];
}
