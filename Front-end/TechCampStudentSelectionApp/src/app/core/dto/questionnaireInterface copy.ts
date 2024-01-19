export interface AnswCategory {
  id: number;
  name: string;
}

export interface AnswQuestion {
  id: number;
  name: string;
  description: string;
  category: AnswCategory;
}

export interface AnswAnswers {
  id: number;
  name: string;
  description: string;
  question: AnswQuestion;
}
