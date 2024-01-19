export interface Candidate {
  id: number;
  names: string;
  surnames: string;
  birthday: Date;
  docNum: string;
  docType: DocType;
  email: string;
  userInformationList: any[];
}
export interface CreateCandidate {
  id: number;
  names: string;
  surnames: string;
  birthday: Date;
  docNum: string;
  docType: DocType;
  email: string;
  userInformationList: any[];
}
export interface DocType {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Question {
  id: number;
  name: string;
  description: string;
  category: Category;
}

export interface Answer {
  id: number;
  name: string;
  description: string;
  question: Question;
}

export interface UserInformationList {
  id: number;
  answer: Answer;
}
