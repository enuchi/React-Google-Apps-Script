const openAddon = async () => {
  await page.setViewport({
    width: 1600,
    height: 1600,
    deviceScaleFactor: 2,
  });
  await page.goto(process.env.SHEET_URL);
  await page.waitForTimeout(5000);

  await page.click('a:nth-child(2)'); // click on signin button
  await page.waitForTimeout(1000);
  await page.type('input[name="identifier"]', process.env.EMAIL); // type email
  await page.click('#identifierNext'); // click "next" button
  await page.waitForTimeout(1000);
  console.log('TEST EMAIL', process.env.EMAIL);
  const bodyInnerHtml = await page.evaluate(() => {
    const body = document.querySelector('body');
    return body.innerHTML;
  });
  console.log(bodyInnerHtml);
  await page.type('input[name="password"]', process.env.PASSWORD); // type pass
  await page.waitForTimeout(1000);
  await page.click('#passwordNext'); // click "next" button
  await page.waitForTimeout(15000); // wait long enough for onopen to be called

  // open new addon menubar item
  await page.evaluate(() => {
    const addOnMenuButton = document.querySelector(
      'div.menu-button.goog-control.goog-inline-block:nth-child(11)'
    );
    addOnMenuButton.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true })
    );
    addOnMenuButton.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
  });

  await page.waitForTimeout(1000);

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
  await page.waitForTimeout(10000);
};

module.exports = { openAddon };
