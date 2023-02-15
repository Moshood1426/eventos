import { UnauthorizedException } from '@nestjs/common';

export function checkPermissions(
  requestUserId: number,
  resourceUserId: number,
) {
  if (requestUserId !== resourceUserId) {
    throw new UnauthorizedException('User not authorized to execute this action');
  }

  return;
}
