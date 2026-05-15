import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';
import { getMatchOptions } from './config';

initStoryshots({
  suite: 'Authorize Device DOM storyshots',
  storyKindRegex: /Authorize Device/,
});

initStoryshots({
  suite: 'Authorize Device storyshots',
  storyKindRegex: /Authorize Device/,
  test: imageSnapshot({
    storybookUrl: 'http://localhost:6006',
    getMatchOptions,
    // witaj puppeteer mordo moja 😇
    // 🔥 moglibyśmy dodać kod który np. startuje authorize device za pomocą puppeteera, ale:
    // 1. po co ;) skoro w innych narzędziach łatwiej, 2. trzeba by zmienić ustawienia storyshots,
    // aby brane były tylko te stories które implementują cały proces.
    // beforeScreenshot: (page) => {
    //   page.$$eval
    //   page.evaluate
    //   // ...
    // }
  })
});
