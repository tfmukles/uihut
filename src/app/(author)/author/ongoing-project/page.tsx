import { getAuthor } from "@/actions/author";
import { getAuthorChat } from "@/actions/author-chat";
import { TAuthorChat } from "@/actions/author-chat/types";
import { getAuthorDesign } from "@/actions/author-design";
import { TAuthorDesign } from "@/actions/author-design/types";
import { TAuthor } from "@/actions/author/types";
import {
  getDesignPipeline,
  getDesignPipelineByAuthor,
} from "@/actions/design-pipeline";
import { TDesignPipeline } from "@/actions/design-pipeline/types";
import { auth } from "@/auth";
import Heading from "@/components/ui/title";
import SeoMeta from "@/partials/SeoMeta";
import { User } from "next-auth";
import { notFound } from "next/navigation";
import DesignRequirementPage from "./_components/DesignRequirementPage";
import DesignSubmitRequest from "./_components/DesignSubmitRequest";

export default async function OngoingProject() {
  const { user } = (await auth()) || {};
  const { data: designPipeline } = await getDesignPipelineByAuthor(user?.id!);
  const { data: author } = await getAuthor(user?.id!);

  const excludedStatus = ["open", "completed", "rejected"];
  const ongoingProject = designPipeline?.filter(
    (pipeline) => !excludedStatus.includes(pipeline.status),
  );

  const filterReviewed = designPipeline?.filter(
    (pipeline) => pipeline.status === "reviewed",
  );

  const inProgressPipelineId = ongoingProject?.[0]?.pipeline_id;
  const reviewedPipelineId = filterReviewed?.[0]?.pipeline_id;

  const { data: requirement } =
    (await getDesignPipeline(inProgressPipelineId!)) || {};

  const { data: authorDesign } = await getAuthorDesign(reviewedPipelineId!);

  const { data: authorChat } =
    (await getAuthorChat(inProgressPipelineId!)) || {};

  // check if the user has access to this page
  const hasAccess = author?.status === "approved";

  if (!hasAccess) {
    notFound();
  }

  return (
    <>
      <SeoMeta title={"Ongoing Project - Uihut"} />
      <section className="border-b border-border py-14 md:py-8">
        <div className="container-fluid">
          <div className="flex items-center justify-between">
            <Heading level="h3" variant={"gradient"}>
              {requirement?.title} Information
            </Heading>
            <DesignSubmitRequest
              status={requirement?.status!}
              pipelineId={inProgressPipelineId!}
            />
          </div>
        </div>
      </section>
      <section className="py-4">
        <div className="container-fluid">
          <DesignRequirementPage
            requirement={requirement as TDesignPipeline}
            chat={authorChat as TAuthorChat}
            user={user as User}
            author={author as TAuthor}
            authorDesign={authorDesign as TAuthorDesign}
          />
        </div>
      </section>
    </>
  );
}
