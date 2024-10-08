// events.enum.ts
// определяю перечисление для всех событий
export enum EventTypes {
	ItemsChanged = 'items:changed',
	CardSelect = 'card:select',
	PreviewChanged = 'preview:changed',
	ProductToggle = 'product:toggle',
	ProductAdd = 'product:add',
	ProductDelete = 'product:delete',
	BasketChanged = 'basket:changed',
	CounterChanged = 'counter:changed',
	BasketOpen = 'basket:open',
	OrderOpen = 'order:open',
	PaymentToggle = 'payment:toggle',
	FormErrorsChange = 'formErrors:change',
	OrderFieldChange = 'order:field:change',
	ContactsFieldChange = 'contacts:field:change',
	DeliveryReady = 'delivery:ready',
	ContactReady = 'contact:ready',
	OrderSubmit = 'order:submit',
	ContactsSubmit = 'contacts:submit',
	ModalOpen = 'modal:open',
	ModalClose = 'modal:close',
}
