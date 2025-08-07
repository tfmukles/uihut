import ProductDetails from "@/components/ProductDetails";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import Modal from "./_components/Modal";

export default async function Page(props: {
  params: Promise<{ productId: string }>;
}) {
  const params = await props.params;

  const { productId } = params;

  return (
    <Modal>
      <Suspense fallback={<SkeletonComponent />}>
        <ProductDetails
          productId={productId}
          className="group relative h-screen overflow-y-auto rounded-lg bg-muted py-5 shadow-lg"
          data-quick-view={true}
        />
      </Suspense>
    </Modal>
  );
}

function SkeletonComponent() {
  return (
    <div className="relative h-screen overflow-y-auto rounded-lg bg-muted py-5 shadow-lg">
      <div className="container-md relative mb-24">
        <div className="grid gap-6 min-[820px]:grid-cols-[1fr_minmax(280px,26.95%)]">
          <div className="mb-6 flex items-end justify-between gap-3 md:gap-6">
            <div>
              <Skeleton className="mb-3 h-6 bg-foreground/20 sm:w-64" />
              <div className="flex items-center space-x-2">
                <Skeleton className="inline-block h-5 w-20 bg-foreground/20" />
                <Skeleton className="inline-block h-5 w-12 bg-foreground/20" />
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-[9px] text-text-dark">
              <div className="inline-flex items-center gap-1">
                <Skeleton className="h-3 w-3 bg-foreground/20" />
                <Skeleton className="h-3 w-6 rounded bg-foreground/20" />
              </div>
              <div className="inline-flex items-center gap-1">
                <Skeleton className="h-3 w-3 bg-foreground/20" />
                <Skeleton className="h-3 w-6 rounded bg-foreground/20" />
              </div>
            </div>
          </div>
          {/* this div is for maintaining grid */}
          <div />
          <div className="space-y-3">
            <div className="card-bg rounded-2xl border border-border p-3">
              <Skeleton className="w-full bg-foreground/20 max-sm:aspect-video sm:h-[800px]" />
            </div>
          </div>
          <aside className="space-y-[22px]">
            <div className="card-bg space-y-3 rounded-2xl border border-border p-4 lg:p-6">
              <Skeleton className="h-10 w-full bg-foreground/20" />
              <Skeleton className="h-10 w-full bg-foreground/20" />
            </div>

            <div className="card-bg space-y-3 rounded-2xl border border-border p-4 lg:p-6">
              <Skeleton className="h-6 w-full bg-foreground/20" />
              <Skeleton className="h-2 w-full bg-foreground/20" />
              <Skeleton className="h-2 w-3/4 bg-foreground/20" />
              <Skeleton className="h-2 w-full bg-foreground/20" />
              <Skeleton className="h-2 w-3/4 bg-foreground/20" />
              <Skeleton className="h-2 w-full bg-foreground/20" />
              <Skeleton className="h-2 w-3/4 bg-foreground/20" />
              <Skeleton className="h-2 w-full bg-foreground/20" />
              <Skeleton className="mt-8 h-6 w-full bg-foreground/20" />
              <Skeleton className="h-2 w-full bg-foreground/20" />
              <Skeleton className="mt-8 h-6 w-full bg-foreground/20" />
              <Skeleton className="h-2 w-full bg-foreground/20" />
            </div>
            <div className="card-bg space-y-3 rounded-2xl border border-border p-4 lg:p-6">
              <Skeleton className="h-6 w-full bg-foreground/20" />
              <Skeleton className="h-2 w-full bg-foreground/20" />
              <Skeleton className="h-2 w-3/4 bg-foreground/20" />
              <Skeleton className="h-2 w-full bg-foreground/20" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
