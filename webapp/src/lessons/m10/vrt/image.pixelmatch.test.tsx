import fs from 'fs';
import path from 'path';

test.skip('should demonstrate this matcher`s usage', () => {
  const imageAtTestPath = path.resolve(__dirname, 'reference.png');
  const imageAtTest = fs.readFileSync(imageAtTestPath);
  expect(imageAtTest).toMatchImageSnapshot();
});

test.skip('should demonstrate a failing test with non-deterministic visual elements', () => {
  const imageAtTestPath = path.resolve(__dirname, 'add-device-token-800x600-reference.png');
  const imageAtTest = fs.readFileSync(imageAtTestPath);
  expect(imageAtTest).toMatchImageSnapshot();
});
