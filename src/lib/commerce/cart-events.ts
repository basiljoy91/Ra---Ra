export const CART_UPDATED_EVENT = "ra:cart-updated";

export function publishCartUpdated(cartCount: number): void {
  window.dispatchEvent(
    new CustomEvent(CART_UPDATED_EVENT, { detail: { cartCount } }),
  );
}
