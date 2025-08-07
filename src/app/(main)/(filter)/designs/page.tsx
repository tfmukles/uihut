import SeoMeta from "@/partials/SeoMeta";
import InFinityProductLoader from "../_components/InfinityProductLoader";

export default function DesignPage() {
  return (
    <>
      <SeoMeta
        title={"Designs"}
        meta_title={"UI Design, Web UI, App UI & Kits, 3D & Icons - Uihut"}
        description={
          "Free & premium UI design resources for all your UI design needs. Download Web UI, App UI, UI Kits, 3D Assets, illustrations, and icons for your next project."
        }
      />
      <InFinityProductLoader title="All Design" />
    </>
  );
}
