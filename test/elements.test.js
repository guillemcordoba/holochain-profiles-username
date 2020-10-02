import { html, fixture, expect } from '@open-wc/testing';
import { setupApolloClientMock } from './mocks';
import { defineSetUsername } from '../dist';

describe('HpuSetUsername', () => {
  it('set username has a placeholder', async () => {
    const client = await setupApolloClientMock();
    defineSetUsername(client);

    const el = await fixture(html` <hpu-set-username></hpu-set-username> `);

    expect(el.shadowRoot.innerHTML).to.include('SET USERNAME');

  });
});
