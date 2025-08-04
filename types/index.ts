import { User } from '@/app/generated/prisma';
import { DateTime } from 'next-auth/providers/kakao';

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
