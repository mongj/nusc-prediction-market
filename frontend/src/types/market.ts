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
};
