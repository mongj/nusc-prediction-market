export type Participant = {
  needPasswordReset: boolean;
};

export type User = {
  id: number;
  friendlyId: string;
  isAdmin: boolean;
  participant?: Participant;
};