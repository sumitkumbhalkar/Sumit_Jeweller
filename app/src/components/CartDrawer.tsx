import React from 'react';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
// @ts-ignore
import { useCart } from '@/store/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { toast } from 'sonner';

const CartDrawer: React.FC = () => {
  const { items, isOpen, setCartOpen, removeItem, updateQuantity, totalAmount, clearCart } = useCart();

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    toast.success('Proceeding to checkout...');
    // In a real app, this would navigate to checkout
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setCartOpen}>
      <SheetContent className="w-full sm:max-w-md bg-[#0B0B0C] border-l border-[#C9A44D]/20 flex flex-col">
        <SheetHeader className="space-y-4">
          <SheetTitle className="font-display text-2xl text-[#F7F7F5] flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-[#C9A44D]" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <ShoppingBag className="w-16 h-16 text-[#C9A44D]/30 mb-4" />
            <p className="font-display text-xl text-[#B9B2A6] mb-2">Your cart is empty</p>
            <p className="text-sm text-[#B9B2A6]/60">
              Explore our collections and add something beautiful
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-xl bg-[#F7F7F5]/5 border border-[#C9A44D]/10"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-sm text-[#F7F7F5] truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#B9B2A6] mt-1">
                      {item.metal} {item.purity}
                    </p>
                    <p className="font-label text-sm text-[#C9A44D] mt-2">
                      {formatPrice(item.finalPrice)}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full bg-[#C9A44D]/20 flex items-center justify-center text-[#C9A44D] hover:bg-[#C9A44D] hover:text-[#0B0B0C] transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-label text-sm text-[#F7F7F5] w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full bg-[#C9A44D]/20 flex items-center justify-center text-[#C9A44D] hover:bg-[#C9A44D] hover:text-[#0B0B0C] transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-[#B9B2A6] hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-[#C9A44D]/20 pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#B9B2A6]">Subtotal</span>
                <span className="font-label text-lg text-[#F7F7F5]">
                  {formatPrice(totalAmount)}
                </span>
              </div>
              <p className="text-xs text-[#B9B2A6]/60">
                Shipping and taxes calculated at checkout
              </p>
              <button
                onClick={handleCheckout}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                Checkout
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => clearCart()}
                className="w-full text-center text-sm text-[#B9B2A6] hover:text-[#C9A44D] transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
