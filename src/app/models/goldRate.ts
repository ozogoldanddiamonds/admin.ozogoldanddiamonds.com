export interface GoldRateHistory {

  rate: number;

  date?: string;
}

export interface GoldRate {

  _id?: string;

  ratePerGram: number;

  history?: GoldRateHistory[];

  updatedBy: any;

  createdAt?: string;

  updatedAt?: string;
}