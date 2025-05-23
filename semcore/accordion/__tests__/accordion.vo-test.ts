import { expect, voiceOverTest as test } from '@semcore/testing-utils/playwright';

import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { writeFile } from 'fs/promises';
import { getReportHeader, makeVoiceOverReporter } from '@semcore/testing-utils/vo-reporter';

test.skip('Users can interact with Accordion via VoiceOver', async ({
  page,
  voiceOver: pureVoiceOver,
}) => {
  const standPath = 'stories/components/accordion/docs/examples/basic_usage.tsx';
  const reportPath = 'website/docs/components/accordion/accordion-a11y-report.md';
  const htmlContent = await e2eStandToHtml(standPath, 'en');
  await page.reload();
  await page.setContent(htmlContent);

  const { voiceOver, getReport } = await makeVoiceOverReporter(pureVoiceOver);
  await voiceOver.interact();

  expect(await voiceOver.itemText()).toBe('Section 1 expanded button');
  await voiceOver.act();
  expect(await voiceOver.itemText()).toBe('Section 1 collapsed button');
  await voiceOver.next();
  expect(await voiceOver.itemText()).toBe('Section 2 collapsed button');
  await voiceOver.next();
  expect(await voiceOver.itemText()).toBe('Section 3 dimmed collapsed button');
  await voiceOver.previous();
  await voiceOver.previous();
  expect(await voiceOver.itemText()).toBe('Section 1 collapsed button');
  await voiceOver.act();
  await voiceOver.next();
  await voiceOver.interact();
  expect(await voiceOver.itemText()).toBe('Hello Section 1');
  await voiceOver.stopInteracting();
  await voiceOver.previous();
  await voiceOver.act();
  await voiceOver.next();
  expect(await voiceOver.itemText()).toBe('Section 2 collapsed button');
  await voiceOver.next();
  expect(await voiceOver.itemText()).toBe('Section 3 dimmed collapsed button');
  await voiceOver.act();
  expect(await voiceOver.itemText()).toBe('Section 3 dimmed collapsed button');

  const report = (await getReportHeader()) + '\n\n' + (await getReport(standPath));

  await writeFile(reportPath, report);
});
