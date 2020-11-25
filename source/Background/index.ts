import 'emoji-log';
import {browser} from 'webextension-polyfill-ts';

browser.runtime.onInstalled.addListener(() => {
  console.emoji('🦄', 'extension installed');
});
