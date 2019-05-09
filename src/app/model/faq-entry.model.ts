/**
 * model that represents an entry in faq
 */
export interface FaqEntryModel {
  id: number;
  question: string;
  response: string;
  tags: Array<string>;
}
