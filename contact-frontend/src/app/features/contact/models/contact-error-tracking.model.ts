export interface ContactErrorTracking {
  id: string;
  name: string;
  email: string;
  subject: string;
  status: string;
  createdAt: Date | string;
  reason: string;
}
