export const openAddon = async (page) => {
  await page.goto(process.env.SHEET_URL);

  await page.waitForSelector('a[aria-label="Sign in"]');

  // Create directory for screenshots if it doesn't exist
  const fs = await import('fs');
  const path = await import('path');
  const screenshotDir = 'test/__image_snapshots__/__diff_output__';
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  // take screenshot
  await page.screenshot({
    path: path.join(
      screenshotDir,
      `1-main-spreadsheet-before-signin-${Date.now()}.png`
    ),
  });
  await page.click('a[aria-label="Sign in"]'); // click on signin button

  // take screenshot
  await page.screenshot({
    path: path.join(screenshotDir, `2-signin-page-${Date.now()}.png`),
  });

  await page.waitForSelector('input[name="identifier"]', { visible: true });
  await page.type('input[name="identifier"]', process.env.EMAIL); // type email

  // take screenshot after entering email
  await page.screenshot({
    path: path.join(screenshotDir, `3-email-entered-${Date.now()}.png`),
  });

  await page.click('#identifierNext'); // click "next" button

  await page.waitForSelector('input[name="Passwd"]', { visible: true });
  await page.type('input[name="Passwd"]', process.env.PASSWORD); // type pass

  // take screenshot after entering password
  await page.screenshot({
    path: path.join(screenshotDir, `4-password-entered-${Date.now()}.png`),
  });

  await page.waitForTimeout(500);

  await page.click('#passwordNext'); // click "next" button
  await page.waitForTimeout(3000);

  // take screenshot after login attempt
  await page.screenshot({
    path: path.join(screenshotDir, `5-after-login-attempt-${Date.now()}.png`),
  });

  if (
    await page.evaluate(
      () =>
        document.querySelector('h1#headingText') &&
        document.querySelector('h1#headingText').innerText.includes('erify')
    )
  ) {
    // take screenshot of verification page
    await page.screenshot({
      path: path.join(screenshotDir, `6-verification-needed-${Date.now()}.png`),
    });

    try {
      await page.click('li:nth-child(3)');
      await page.waitForTimeout(6000);

      // take screenshot after selecting verification method
      await page.screenshot({
        path: path.join(
          screenshotDir,
          `7-verification-method-selected-${Date.now()}.png`
        ),
      });
    } catch {
      // eslint-disable-next-line no-console
      console.log('The "choose account recovery method" page isn\'t shown');
    }

    await page.type(
      'input[name="knowledgePreregisteredEmailResponse"]',
      process.env.TEST_RECOVERY_EMAIL
    ); // type recovery email

    // take screenshot after entering recovery email
    await page.screenshot({
      path: path.join(
        screenshotDir,
        `8-recovery-email-entered-${Date.now()}.png`
      ),
    });

    await page.waitForTimeout(6000);
    await page.click('div[data-primary-action-label] button'); // click "next" button
    await page.waitForTimeout(5000);

    // take screenshot after verification completed
    await page.screenshot({
      path: path.join(
        screenshotDir,
        `9-verification-completed-${Date.now()}.png`
      ),
    });
  }

  if (
    await page.evaluate(
      () =>
        document.querySelector('h1#headingText') &&
        document
          .querySelector('h1#headingText')
          .innerText.includes('implify your sign')
    )
  ) {
    // take screenshot of simplify sign-in page
    await page.screenshot({
      path: path.join(
        screenshotDir,
        `10-simplify-signin-page-${Date.now()}.png`
      ),
    });

    try {
      await page.click(
        'div[data-secondary-action-label] > div > div:nth-child(2) button'
      );
      await page.waitForTimeout(6000);

      // take screenshot after dismissing simplify sign-in
      await page.screenshot({
        path: path.join(
          screenshotDir,
          `11-after-dismissing-simplify-signin-${Date.now()}.png`
        ),
      });
    } catch {
      // eslint-disable-next-line no-console
      console.log('The "Simplify your sign-in" page isn\'t shown');
    }
  }

  await page.waitForSelector(
    'div.menu-button.goog-control.goog-inline-block:nth-child(10)',
    { visible: true }
  );

  // take screenshot before opening addon menu
  await page.screenshot({
    path: path.join(
      screenshotDir,
      `12-before-opening-addon-menu-${Date.now()}.png`
    ),
  });

  // open new addon menubar item
  await page.evaluate(() => {
    const addOnMenuButton = document.querySelector(
      'div.menu-button.goog-control.goog-inline-block:nth-child(10)'
    );
    addOnMenuButton.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true })
    );
    addOnMenuButton.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
  });

  await page.waitForSelector(
    'div.goog-menu.goog-menu-vertical.apps-menu-hide-mnemonics:last-child > div:nth-child(2) > div',
    { visible: true }
  );

  // take screenshot with addon menu opened
  await page.screenshot({
    path: path.join(screenshotDir, `13-addon-menu-opened-${Date.now()}.png`),
  });

  // open "bootstrap" menu item
  await page.evaluate(() => {
    const bootstrapMenuButton = document.querySelector(
      'div.goog-menu.goog-menu-vertical.apps-menu-hide-mnemonics:last-child > div:nth-child(2) > div'
    );
    bootstrapMenuButton.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true })
    );
    bootstrapMenuButton.dispatchEvent(
      new MouseEvent('mouseup', { bubbles: true })
    );
    bootstrapMenuButton.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true })
    );
    bootstrapMenuButton.dispatchEvent(
      new MouseEvent('mouseup', { bubbles: true })
    );
  });
  await page.waitForSelector('div[role="dialog"]', {
    visible: true,
    timeout: 10000,
  });

  // take screenshot after clicking bootstrap menu item
  await page.screenshot({
    path: path.join(
      screenshotDir,
      `14-bootstrap-dialog-opened-${Date.now()}.png`
    ),
  });

  await page.waitForTimeout(15000);

  // take final screenshot after waiting period
  await page.screenshot({
    path: path.join(screenshotDir, `15-addon-fully-loaded-${Date.now()}.png`),
  });
};
