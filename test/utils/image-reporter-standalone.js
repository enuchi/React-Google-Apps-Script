/* eslint-disable */

/**
 * Reference: https://github.com/americanexpress/jest-image-snapshot/blob/main/examples/image-reporter.js
 *
 * To enable this image reporter, add it to your `jest.config.js` "reporters" definition:
 * "reporters": [ "default", "<rootDir>/image-reporter.js" ]
 *
 * Note: Image Reporter may not work with jest's --forceExit flag
 *
 * Note: If image reporter doesn't work in pipeline can try running as standalone script
 * by creating a separate script file and running like this:
 * "test:integration": "jest test/local-development.test || node test/utils/image-reporter-standalone.js"
 */

const fs = require('fs');
const AWS = require('aws-sdk/global');
const S3 = require('aws-sdk/clients/s3'); // this is needed
require('dotenv').config();

const UPLOAD_BUCKET = process.env.S3_BUCKET_NAME;

if (
  !process.env.S3_BUCKET_NAME ||
  !process.env.AWS_SECRET_ACCESS_KEY ||
  !process.env.AWS_ACCESS_KEY_ID
) {
  console.log('Missing env variables. Skipping upload of image diff files.');
}

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

const targetDirectories = [
  // './test/__image_snapshots__/',
  './test/__image_snapshots__/__diff_output__/',
];
targetDirectories.forEach((targetDirectory) => {
  fs.readdirSync(targetDirectory, { withFileTypes: true }).forEach((dirent) => {
    if (!dirent.isFile()) return;
    const path = `images/${dirent.name}`;
    const params = {
      Body: fs.readFileSync(`${targetDirectory}/${dirent.name}`),
      Bucket: UPLOAD_BUCKET,
      Key: path,
      ContentType: 'image/png',
    };
    s3.putObject(params, (err) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(
          `Uploaded file to https://${UPLOAD_BUCKET}.s3.amazonaws.com/${path}`
        );
      }
    });
  });
});
