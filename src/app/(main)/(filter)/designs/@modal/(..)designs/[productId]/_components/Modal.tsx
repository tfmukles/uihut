"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useDialog } from "@/hooks/useDialog";
import { ExternalLink } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
  let router = useRouter();
  const pathname = usePathname();
  const { onOpenChange } = useDialog();

  useEffect(() => {
    onOpenChange(true);
  }, []);

  let onDismiss = () => {
    router.back();
    onOpenChange(false);
  };

  return (
    <Dialog open onOpenChange={onDismiss}>
      <DialogContent className="animate-in zoom-in-100 z-50 h-full max-h-screen max-w-7xl rounded-none !bg-transparent p-0 shadow-none duration-500 ease-in lg:max-h-[calc(100vh_-_86px)] [&>.close]:!top-1 [&>.close]:!right-1 [&>.close]:border [&>.close]:border-white [&>.close]:text-white [&>.close]:opacity-100 [&>.close]:shadow lg:[&>.close]:top-[41px] lg:[&>.close]:right-0 [&>.close_svg]:!size-5">
        <DialogTitle className="hidden" />
        <a
          href={pathname}
          target="_blank"
          className="bg-background text-muted-foreground/50 border-muted-foreground absolute top-1 right-10 z-30 flex size-[30px] flex-none items-center justify-center rounded-full border lg:top-12 lg:right-1"
        >
          <ExternalLink className="border- size-[18px] stroke-2" />
        </a>
        <div className="pt-10 lg:pt-0 lg:pr-10">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
