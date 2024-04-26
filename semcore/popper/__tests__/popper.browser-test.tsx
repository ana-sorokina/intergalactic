import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Popper', () => {
  test('Focus lock', async ({ page }) => {
    const standPath = 'semcore/popper/__tests__/stands/dropdown.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.mouse.click(1, 1);

    await page.keyboard.press('Tab');

    for (let i = 0; i < 50; i++) {
      await page.keyboard.press('Tab');
      await page.waitForFunction(() => {
        const focusedElement = document.activeElement;
        return (
          focusedElement?.matches('[data-testid="popper"]') ||
          focusedElement?.matches('[data-testid="input-in-popper"]')
        );
      });
    }
  });
  test('Focus lock with disablePortal', async ({ page }) => {
    const standPath = 'semcore/popper/__tests__/stands/disablePortal.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.mouse.click(1, 1);

    await page.keyboard.press('Tab');

    for (let i = 0; i < 50; i++) {
      await page.keyboard.press('Tab');
      await page.waitForFunction(() => {
        const focusedElement = document.activeElement;
        return (
          focusedElement?.matches('[data-testid="popper"]') ||
          focusedElement?.matches('[data-testid="input-in-popper"]')
        );
      });
    }
  });
  test('cursor anchoring', async ({ page }) => {
    const standPath = 'semcore/popper/__tests__/stands/cursorAnchoring.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = await page.locator('[data-testid="trigger"]');
    const popper = await page.locator('[data-testid="popper"]');

    const triggerRect = (await trigger.boundingBox())!;
    const triggerRightBottomCorner = [
      triggerRect.x + triggerRect.width,
      triggerRect.y + triggerRect.height,
    ];
    const triggerLeftBottomCorner = [triggerRect.x, triggerRect.y + triggerRect.height];

    await page.mouse.move(triggerRightBottomCorner[0] + 10, triggerRightBottomCorner[1] + 10);
    await page.mouse.move(triggerRightBottomCorner[0] - 10, triggerRightBottomCorner[1] - 10, {
      steps: 10,
    });

    let popperRect = (await popper.boundingBox())!;
    expect(popperRect.x).toBeGreaterThan(triggerRect.x + triggerRect.width * (4 / 5));

    await page.mouse.move(triggerLeftBottomCorner[0] - 10, triggerLeftBottomCorner[1] + 10);
    await new Promise((r) => setTimeout(r, 1000));
    await page.mouse.move(triggerLeftBottomCorner[0] + 10, triggerLeftBottomCorner[1] - 10, {
      steps: 10,
    });

    popperRect = (await popper.boundingBox())!;
    expect(popperRect.x).toBeLessThan(triggerRect.x + triggerRect.width * (1 / 5));
  });
  test.describe('label', () => {
    test('referenced', async ({ page }) => {
      const standPath = 'semcore/popper/__tests__/stands/label-referenced.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const option1Locator = await page.locator('text=Option 1');
      const option3Locator = await page.locator('text=Option 3');

      await expect(option3Locator).toHaveCount(0);

      await page.locator('label').click();

      await expect(option3Locator).toHaveCount(1);

      await option1Locator.click();

      await expect(option3Locator).toHaveCount(0);
    });
    test('wrapped', async ({ page }) => {
      const standPath = 'semcore/popper/__tests__/stands/label-wrapped.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const option1Locator = await page.locator('text=Option 1');
      const option3Locator = await page.locator('text=Option 3');

      await expect(option3Locator).toHaveCount(0);

      await page.locator('label').click();

      await expect(option3Locator).toHaveCount(1);

      await option1Locator.click();

      await expect(option3Locator).toHaveCount(0);
    });
    test('wrapped with disable portal', async ({ page }) => {
      const standPath = 'semcore/popper/__tests__/stands/label-wrapped-disable-portal.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const option1Locator = await page.locator('text=Option 1');
      const option3Locator = await page.locator('text=Option 3');

      await expect(option3Locator).toHaveCount(0);

      await page.locator('label').click();

      await expect(option3Locator).toHaveCount(1);

      await option1Locator.click();

      await expect(option3Locator).toHaveCount(0);
    });
  });
});
