import { getListPage } from "@/lib/contentParser";
import BoxLayout from "@/partials/BoxLayout";
import SeoMeta from "@/partials/SeoMeta";
import { ExtendedPage } from "@/types";
import ContactForm from "./_components/ContactForm";

const page = async () => {
  const { frontmatter: contactData }: ExtendedPage =
    getListPage("contact/_index.md");

  return (
    <>
      <SeoMeta
        title={contactData?.title}
        meta_title={contactData?.meta_title}
        description={contactData?.description}
      />
      <BoxLayout
        headerTitle={contactData?.title}
        headerDescription={contactData?.content}
        footerTitle={contactData?.footer_title}
        footerDescription={contactData?.footer_content}
      >
        <section>
          <div className="container">
            <ContactForm />
          </div>
        </section>
      </BoxLayout>
    </>
  );
};

export default page;
