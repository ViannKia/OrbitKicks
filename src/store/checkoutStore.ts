import { create } from "zustand";

export type PaymentMethod = "card" | "ewallet" | "bank" | "cod";

export interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface PaymentInfo {
  method: PaymentMethod;
  cardNumber?: string;
  cardName?: string;
  cardExpiry?: string;
  cardCvc?: string;
  ewalletProvider?: string;
  bankProvider?: string;
}

export interface Order {
  id: string;
  date: string;
  shipping: ShippingInfo;
  payment: PaymentInfo;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  items: Array<{
    name: string;
    size: number;
    quantity: number;
    price: number;
    imageUrl: string;
  }>;
}

interface CheckoutStore {
  shipping: ShippingInfo;
  payment: PaymentInfo;
  lastOrder: Order | null;
  setShipping: (info: Partial<ShippingInfo>) => void;
  setPayment: (info: Partial<PaymentInfo>) => void;
  saveOrder: (order: Order) => void;
  resetCheckout: () => void;
}

const initialShipping: ShippingInfo = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
};

const initialPayment: PaymentInfo = {
  method: "card",
};

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  shipping: initialShipping,
  payment: initialPayment,
  lastOrder: null,

  setShipping: (info) =>
    set((state) => ({ shipping: { ...state.shipping, ...info } })),

  setPayment: (info) =>
    set((state) => ({ payment: { ...state.payment, ...info } })),

  saveOrder: (order) => set({ lastOrder: order }),

  resetCheckout: () =>
    set({ shipping: initialShipping, payment: initialPayment }),
}));
