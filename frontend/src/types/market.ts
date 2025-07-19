export type Market = {
  id: number;
  name: string;
  question: string;
  openOn: Date;
  closeOn: Date;
  isOpen: boolean;
  isControl: boolean;
  resolution: boolean | null;
  yes_no_flag?: boolean | null;
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
  userBetChangeCount?: number;
  userIsCorrect?: boolean;
};
