import { createContext, useContext, useReducer } from "react";

// Action types
const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";
const CLEAR_CART = "CLEAR_CART";

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      const existingItem = state.items.find(
        (item) => item.id === action.product.id
      );

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          items: updatedItems,
          totalItems: updatedItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          ),
        };
      } else {
        const newItems = [...state.items, { ...action.product, quantity: 1 }];
        return {
          items: newItems,
          totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
        };
      }
    }

    case UPDATE_QUANTITY: {
      if (action.quantity <= 0) {
        const filteredItems = state.items.filter(
          (item) => item.id !== action.id
        );
        return {
          items: filteredItems,
          totalItems: filteredItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          ),
        };
      }

      const updatedItems = state.items.map((item) =>
        item.id === action.id ? { ...item, quantity: action.quantity } : item
      );
      return {
        items: updatedItems,
        totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    }

    case REMOVE_ITEM: {
      const filteredItems = state.items.filter((item) => item.id !== action.id);
      return {
        items: filteredItems,
        totalItems: filteredItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    }

    case CLEAR_CART:
      return { items: [], totalItems: 0 };

    default:
      return state;
  }
};

// Context
const CartContext = createContext();

// Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    totalItems: 0,
  });

  const addItem = (product) => {
    dispatch({ type: ADD_ITEM, product });
  };

  const removeItem = (id) => {
    dispatch({ type: REMOVE_ITEM, id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: UPDATE_QUANTITY, id, quantity });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const getItemQuantity = (id) => {
    const item = state.items.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook
const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default useCart;