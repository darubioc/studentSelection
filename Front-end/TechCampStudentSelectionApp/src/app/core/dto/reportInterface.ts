export interface Convocation {
  id: number;
  name: string;
  dateConvocation: Date;
}

export interface RatedCandidate {
  id: number;
  candidateName: string;
  candidateId: number;
  totalScore: number;
  convocation: Convocation;
  reportDetail: any[];
  convocationId: number;
}

