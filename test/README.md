# Running tests

Integration tests here are used to ensure the existing local development setup works across different platforms, and that new features do not break the functionality of the local development environment.

The "extended" local development integration test builds and deploys the local development setup needed to use hot reload functionality. It deploys the local setup to a spreadsheet inside a test Google account, runs a local development server, and checks that changes to the local files are reflected inside the spreadsheet's add-on, similar to how local development is intended to be used.

Jest is used to run the tests and compare images of the changes, and Puppeteer is used to control the browser. A test account and test spreadsheet need to be created and credentials need to be passed in through environment variables in order for this "extended" version to work. Example `.env` file variables are listed below. Since secret values cannot be used in PRs opened from forks, a shorter integration test will soon be made available that doesn't deploy the app to a spreadsheet, but just loads it locally. This will be a faster way to check small PRs from forks don't break the hot reload functionality.

## Extended integration test

In order to test the extended integration test locally you will need to create or use a test Google account. It's recommended you create an account solely for this purpose rather than using an existing account. You'll need to create a new project and include the following variables in the `.env` file in the root:

```bash
SHEET_URL = https://docs.google.com/spreadsheets/d/****************/edit#gid=0
EMAIL = myisolatedtestaccount@gmail.com
PASSWORD = testaccountpassword
TEST_RECOVERY_EMAIL = myisolatedtestaccountsrecoveryemail@gmail.com
RUNNER_OS = macOS # GitHub actions value to simulate locally, either Linux, Windows, or macOS

# For image reporting only
S3_BUCKET_NAME = my-bucket-name
AWS_ACCESS_KEY_ID = A35D************
AWS_SECRET_ACCESS_KEY = slkf***********/234jdh**********
```

Make sure that you have followed the instructions to install local certs (see main README). The test will use Puppeteer to open the spreadsheet URL and log in to your account using your email and password provided. In case it doesn't recognize you it will ask for this account's recovery email -- you'll need to include this in the `.env` file as well.

### Running the extended tests in the pipeline

To run the extended integration test in a pipeline using Github Actions, reference the .github/workflows directory. You'll need to add some additional environment variables through the repo secrets settings in order to get the full flow working:

DOT_CLASPRC - the `.clasprs.json` file from user directory containing clasp login credentials 
DOT_CLASP - the `.clasp.json` file from this repo matching the test spreadsheet
TEST_ACCOUNT_EMAIL, TEST_RECOVERY_EMAIL, TEST_ACCOUNT_PASSWORD, TEST_SPREADSHEET_URL - see above variables

# Additional notes

### Stealth login
`puppeteer-extra` and `puppeteer-extra-plugin-stealth` are used to help log in to a Google account in the pipeline. They are not easily compatible with the `jest-puppeteer` package, so a custom integration is used that is documented on `jest`'s site [here](jestjs.io/docs/puppeteer#custom-example-without-jest-puppeteer-preset).


### Generating certs in the pipeline
There are permissions issues running `mkcert -install` in Windows runners, so a powershell script in `./generate-cert.ps1` is used to generate the certs and enable https.

### Jest open handles
There are issues with `jest` keeping handles open after all tests finish on Windows runners, so `jest --forceExit` is used to resolve them, although this flag may not be needed on certain platforms (like Mac OS).

### Jest Image Snapshots
`jest-image-snapshot` is used to compare browser snapshots and detect discrepancies or regressions. Thresholds have been adjusted to allow for some variation across different platforms due to differences in font rendering and color profiles.

If a snapshot fails, a diff image is created in the __diff_output__ directory, showing the comparison. If it fails in the pipeline it may be hard to see this diff. An Image Reporter class is used to upload diff images to an S3 bucket from the pipeline. This can be modified to use any image store. If used, make sure it is enabled in `jest.config.js` and that the necessary environment variables (AWS keys, bucket name, etc.) are added to `.env` file (see above section).