export default function CartLoading() {
  return (
    <div className="bg-[#f6f0ea] px-5 py-12 text-[#181512] sm:px-8 lg:px-12" role="status" aria-label="Loading cart">
      <div className="mx-auto max-w-[96rem] animate-pulse">
        <div className="h-56 bg-black/10 lg:h-64" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_23rem]">
          <div className="space-y-3"><div className="h-44 bg-black/8" /><div className="h-44 bg-black/8" /></div>
          <div className="h-80 bg-black/8" />
        </div>
      </div>
      <span className="sr-only">Loading your cart</span>
    </div>
  );
}
