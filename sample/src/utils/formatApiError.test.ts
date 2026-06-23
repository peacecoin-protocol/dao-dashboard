import { describe, expect, it } from 'vitest';
import { formatApiError } from './formatApiError';

describe('formatApiError', () => {
  it('returns null for successful responses', () => {
    expect(formatApiError({ success: true, message: 'ok' })).toBeNull();
  });

  it('uses status hint and shortens long hex in details', () => {
    const result = formatApiError({
      success: false,
      status: 'FAILED_TO_SET_TOKEN_URI',
      message: 'Failed to set token URI. for token 111',
      error:
        'execution reverted (unknown custom error) (action="estimateGas", data="0x3f6cc768000000000000000000000000000000000000000000000000000000000", transaction={ "data": "0x' +
        'c'.repeat(200) +
        '" })',
      data: { step: 'setTokenUri', tokenIndex: 0 },
    });

    expect(result?.title).toBe('Failed to set token URI. for token 111');
    expect(result?.hint).toContain('Failed at step: setTokenUri');
    expect(result?.hint).toContain('default admin');
    expect(result?.details).not.toContain('c'.repeat(200));
    expect(result?.details).toContain('…');
  });

  it('maps NOT_DAO_MANAGER status', () => {
    const result = formatApiError({
      success: false,
      status: 'NOT_DAO_MANAGER',
      message: 'Backend signer lacks required minter or admin role.',
    });

    expect(result?.hint).toContain('minter role');
  });
});
