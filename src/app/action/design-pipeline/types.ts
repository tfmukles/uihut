export type TDesignPipeline = {
  pipeline_id: string;
  creator_id: string;
  author_id: string;
  reviewer_id: string;
  checker_id: string;
  title: string;
  category: string;
  type: string;
  sub_category: string;
  description: string;
  figma: string;
  page_list: string[];
  inspirations: string[];
  guideline: string;
  work_start: Date;
  work_duration: number;
  work_end: Date;
  status: string;
  createdAt: Date;
  variables: {
    pipeline_id: string;
    author_id?: string;
    figma?: string;
    work_start?: Date;
    status?: string;
  };
};
