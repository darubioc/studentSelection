export interface Convocation {
  id: number;
  name: string;
  dateConvocation: Date;
}

export interface Priority {
  id: number;
  name: string;
  value: number;
  featureId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: any;
  active: boolean;
}

export interface Criteria {
  id: number;
  name: string;
  convocation: Convocation;
  convocationId: number;
  weight: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: any;
  active: boolean;
  priorities: Priority[];
}
