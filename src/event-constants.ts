// event-constants.ts
// создайл объект, сопоставляющий значения из перечисления
import { EventTypes } from './events.enum';

export const EventConstants = {
    [EventTypes.ItemsChanged]: EventTypes.ItemsChanged,
    [EventTypes.CardSelect]: EventTypes.CardSelect,
    [EventTypes.PreviewChanged]: EventTypes.PreviewChanged,
    [EventTypes.ProductToggle]: EventTypes.ProductToggle,
    [EventTypes.ProductAdd]: EventTypes.ProductAdd,
    [EventTypes.ProductDelete]: EventTypes.ProductDelete,
    [EventTypes.BasketChanged]: EventTypes.BasketChanged,
    [EventTypes.CounterChanged]: EventTypes.CounterChanged,
    [EventTypes.BasketOpen]: EventTypes.BasketOpen,
    [EventTypes.OrderOpen]: EventTypes.OrderOpen,
    [EventTypes.PaymentToggle]: EventTypes.PaymentToggle,
    [EventTypes.FormErrorsChange]: EventTypes.FormErrorsChange,
    [EventTypes.OrderFieldChange]: EventTypes.OrderFieldChange,
    [EventTypes.ContactsFieldChange]: EventTypes.ContactsFieldChange,
    [EventTypes.DeliveryReady]: EventTypes.DeliveryReady,
    [EventTypes.ContactReady]: EventTypes.ContactReady,
    [EventTypes.OrderSubmit]: EventTypes.OrderSubmit,
    [EventTypes.ContactsSubmit]: EventTypes.ContactsSubmit,
    [EventTypes.ModalOpen]: EventTypes.ModalOpen,
    [EventTypes.ModalClose]: EventTypes.ModalClose,
};
