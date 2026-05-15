import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';
import { getMatchOptions } from './config';

initStoryshots({
  suite: 'Atoms DOM storyshots',
  storyKindRegex: /^Atoms/,
});

initStoryshots({
  suite: 'Atoms Visual storyshots',
  storyKindRegex: /^Atoms/,
  test: imageSnapshot({
    storybookUrl: 'http://localhost:6006',
    getMatchOptions,
  })
});
