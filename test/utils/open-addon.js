const openAddon = async page => {
  await page.setViewport({
    width: 800,
    height: 800,
    deviceScaleFactor: 1,
  });

  await page.goto(process.env.SHEET_URL);
  await page.waitForTimeout(5000);

  await page.click('a:nth-child(2)'); // click on signin button
  await page.waitForTimeout(3000);
  console.log('email is:', process.env.EMAIL, process.env.EMAIL.slice(-5));
  console.log('pass is:', process.env.EMAIL, process.env.PASSWORD.slice(-5));
  console.log(
    await page.evaluate(() => document.querySelector('body').innerText)
  );
  await page.type('input[name="identifier"]', process.env.EMAIL); // type email
  console.log(
    await page.evaluate(() => document.querySelector('body').innerText)
  );
  await page.click('#identifierNext'); // click "next" button
  console.log(
    await page.evaluate(() => document.querySelector('body').innerText)
  );
  await page.waitForTimeout(3000);
  console.log(
    await page.evaluate(() => document.querySelector('body').innerText)
  );
  await page.type('input[name="password"]', process.env.PASSWORD); // type pass
  console.log(
    await page.evaluate(() => document.querySelector('body').innerText)
  );
  await page.waitForTimeout(3000);
  console.log(
    await page.evaluate(() => document.querySelector('body').innerText)
  );
  console.log(
    await page.evaluate(() => document.querySelector('body').innerText)
  );
  await page.click('#passwordNext'); // click "next" button

  await page.waitForTimeout(25000); // wait long enough for onopen to be called

  console.log(
    await page.evaluate(() => document.querySelector('body').innerText)
  );

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

  await page.waitForTimeout(6000);

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
