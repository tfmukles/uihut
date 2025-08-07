"use client";

import { TDesign } from "@/actions/designs/types";
import DownloadButton from "@/components/DownloadButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Spinner from "@/components/ui/spinner";
import countryDetector from "@/lib/utils/countryDetector";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function FreeDownloadButton({ product }: { product: TDesign }) {
  const country = countryDetector();

  const [tweetDialogOpen, setTweetDialogOpen] = useState(false);
  const [tweetUrl, setTweetUrl] = useState("");
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const [showInput, setShowInput] = useState(false);
  const downloadBtnRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const pageUrl =
    typeof window !== "undefined" ? window.location.origin + pathname : "";

  // Pre-filled tweet text
  const tweetText = encodeURIComponent(
    `Just found an amazing free Figma resource on @uihutofficial! 🎉\n\nWorks seamlessly with @figma — design just got way easier! 🚀\n\nThey’ve also got awesome @webflow resources.\n\nCheck it out here 👉 ${pageUrl}`,
  );

  const shareUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

  async function handleTweetCheck(e: React.FormEvent) {
    e.preventDefault();
    setChecking(true);
    setError("");
    try {
      const res = await fetch("/api/tweet-checker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tweetUrl }),
      });
      const data = await res.json();
      if (data.found) {
        setTweetDialogOpen(false);
        setTimeout(() => {
          downloadBtnRef.current?.click();
        }, 100);
        toast.success("Tweet verified! Download starting...");
      } else {
        setError("Tweet must contain both 'uihut' and 'figma'.");
      }
    } catch {
      setError("Failed to verify tweet. Please try again.");
    }
    setChecking(false);
  }

  // Only show the dialog/share logic if country is India
  if (country !== "India") {
    return (
      <DownloadButton
        product={product}
        asChild
        loadingComponent={
          <Button size={"xl"} className="w-full" type="button">
            Starting Download <Spinner />
          </Button>
        }
      >
        <Button size={"xl"} className="w-full" type="button">
          Download Figma File
        </Button>
      </DownloadButton>
    );
  }

  return (
    <>
      <Dialog open={tweetDialogOpen} onOpenChange={setTweetDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share to Unlock Download</DialogTitle>
          </DialogHeader>
          <div className="mb-4 space-y-2">
            <p className="text-sm text-muted-foreground">
              To download this free resource, please share a post about UIHut on
              Twitter/X.
            </p>
          </div>
          {!showInput && (
            <div className="mb-4 flex flex-col gap-2">
              <a
                href={shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowInput(true)}
              >
                <Button variant="default" className="w-full">
                  Share this page on Twitter/X
                </Button>
              </a>
            </div>
          )}
          {showInput && (
            <form onSubmit={handleTweetCheck}>
              <Label className="mb-2">Paste your tweet link here</Label>
              <Input
                placeholder="https://twitter.com/yourusername/status/1234567890"
                value={tweetUrl}
                onChange={(e) => setTweetUrl(e.target.value)}
                required
                disabled={checking}
                className="mb-2"
              />
              {error && <div className="text-sm text-red-500">{error}</div>}
              <DialogFooter className="mt-4">
                <Button type="submit" size="xl" disabled={checking}>
                  {checking ? <Spinner /> : "Verify & Download"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
      <DownloadButton
        product={product}
        asChild
        loadingComponent={
          <Button size={"xl"} className="w-full" type="button">
            Starting Download <Spinner />
          </Button>
        }
      >
        <Button
          size={"xl"}
          className="w-full"
          type="button"
          style={{ display: "none" }}
          ref={downloadBtnRef}
        >
          Download Figma File
        </Button>
      </DownloadButton>
      <Button
        size="xl"
        className="w-full"
        type="button"
        onClick={() => setTweetDialogOpen(true)}
      >
        Share To Unlock Download
      </Button>
    </>
  );
}
