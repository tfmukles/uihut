export interface Option {
  label: string;
  value: string;
}

export interface Question {
  id: number;
  name: string;
  question: string;
  options?: Option[]; // Optional as some questions may not have options
  exclude?: string[]; // Optional for questions with excluded options
  field?: string; // For input field types (e.g., text)
  type?: string; // For specifying input type (e.g., text, email, etc.)
}

export interface IOnboardingForm {
  title: string;
  meta_title: string;
  description: string;
  content: string;
  draft: boolean;
  questions: Question[];
}
