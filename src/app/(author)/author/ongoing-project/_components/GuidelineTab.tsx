"use client";

import { TDesignPipeline } from "@/actions/design-pipeline/types";
import Heading from "@/components/ui/title";
import { markdownify } from "@/lib/utils/textConverter";

const GuidelineTab = ({ requirement }: { requirement: TDesignPipeline }) => {
  return (
    <div className="content">
      <Heading level="h3" variant={"gradient"} className={"mb-8"}>
        {requirement?.title}
      </Heading>

      <Heading level="h4" variant={"gradient"} className={"mb-2"}>
        Overview
      </Heading>
      <p>{requirement?.description}</p>

      <Heading level="h4" variant={"gradient"} className={"mb-2"}>
        Estimated Time For This Project
      </Heading>
      <p>{requirement?.work_duration} Days</p>

      <Heading level="h4" variant={"gradient"} className={"mb-2"}>
        Inspirations And References
      </Heading>
      <ul>
        {requirement?.inspirations.map((inspiration: string) => (
          <li key={inspiration}>
            <a href={inspiration} target="_blank" rel="noopener noreferrer">
              {inspiration}
            </a>
          </li>
        ))}
      </ul>

      <Heading level="h4" variant={"gradient"} className={"mb-2"}>
        Must Have Pages
      </Heading>
      <ol>
        {requirement?.page_list.map((page: string) => (
          <li key={page}>{page}</li>
        ))}
      </ol>

      <Heading level="h4" variant={"gradient"} className={"mb-2"}>
        Guideline
      </Heading>
      <div dangerouslySetInnerHTML={markdownify(requirement?.guideline!)} />
    </div>
  );
};

export default GuidelineTab;
