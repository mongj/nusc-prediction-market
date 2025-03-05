export type Market = {
  id: number;
  name: string;
  question: string;
  openOn: Date;
  closeOn: Date;
  isOpen: boolean;
  isControl: boolean;
  resolution: boolean | null;
  createdAt: Date;
  updatedAt: Date;
  hasAnswered: boolean;
  isCorrect: boolean;
  totalYes: number;
  totalNo: number;
};

export type MarketWithUserSpecificData = Market & {
  userAnswer?: boolean;
  userBetAmount?: number;
  userIsCorrect?: boolean;
};
