import { create } from "zustand"

export interface CartItem {
  id: string
  title: string
  price: number
  thumbnail: string
  frame: string
  mount: string
  size: string
  quantity: number
}

interface CartStore {
  isOpen: boolean
  items: CartItem[]
  openCart: () => void
  closeCart: () => void
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  getSubtotal: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  isOpen: false,
  items: [],

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  addItem: (item) => {
    const items = get().items
    const existingItem = items.find(
      (i) =>
        i.title === item.title &&
        i.frame === item.frame &&
        i.mount === item.mount &&
        i.size === item.size
    )

    if (existingItem) {
      set({
        items: items.map((i) =>
          i.id === existingItem.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      })
    } else {
      set({
        items: [...items, { ...item, quantity: 1 }],
      })
    }

    // Auto-open cart drawer when item is added
    set({ isOpen: true })
  },

  removeItem: (id) => {
    set({
      items: get().items.filter((item) => item.id !== id),
    })
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id)
      return
    }

    set({
      items: get().items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })
  },

  getSubtotal: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  },
}))
