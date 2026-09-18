import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized access') {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends Error {
  constructor(message = 'Access forbidden: Insufficient permissions') {
    super(message);
    this.name = 'ForbiddenError';
  }
}

/**
 * Returns the current authenticated user session or throws UnauthorizedError
 */
export async function getRequiredSession() {
  const session = await auth();
  if (!session || !session.user) {
    throw new UnauthorizedError('Please log in to access this resource.');
  }
  return session;
}

/**
 * Ensures user has one of the allowed roles
 */
export async function requireRole(allowedRoles: string[]) {
  const session = await getRequiredSession();
  const userRole = (session.user as any).role;
  if (!allowedRoles.includes(userRole)) {
    throw new ForbiddenError(`Role ${userRole} is not authorized for this operation.`);
  }
  return session;
}

/**
 * STRICT INVESTOR DATA ISOLATION GUARD:
 * Obtains the logged-in investor's profile ONLY from the verified server session.
 * Never trusts IDs passed from frontend client!
 */
export async function getStrictAuthenticatedInvestor() {
  const session = await getRequiredSession();
  if (!session.user || !session.user.id) {
    throw new UnauthorizedError('Invalid user session identity.');
  }
  const userId = session.user.id;
  const userRole = (session.user as any).role;

  if (userRole !== 'INVESTOR' && userRole !== 'SUPER_ADMIN' && userRole !== 'INVESTMENT_MANAGER') {
    throw new ForbiddenError('Only authenticated investors can view this portfolio.');
  }

  const investor = await db.investorProfile.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          phone: true,
          userCode: true,
          status: true,
        },
      },
      nominees: true,
      investments: {
        include: {
          project: {
            include: {
              translations: true,
              media: true,
              documents: true,
              constructionUpdates: true,
            },
          },
          projectUnit: true,
          payments: {
            orderBy: { dueDate: 'asc' },
          },
        },
      },
    },
  });

  if (!investor) {
    throw new ForbiddenError('No investor profile linked to this account.');
  }

  return investor;
}

/**
 * Asserts that the requested document or investment belongs to the authenticated investor.
 */
export async function assertInvestorOwnership(investmentId: string) {
  const investor = await getStrictAuthenticatedInvestor();
  const isOwner = investor.investments.some((inv) => inv.id === investmentId);
  
  if (!isOwner && (investor.user as any).role === 'INVESTOR') {
    throw new ForbiddenError('Security Alert: You are not authorized to view another investor\'s records.');
  }
  return investor;
}
