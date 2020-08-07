import { configure } from '@storybook/vue';
import '../src/assets/globals.scss';

const req = require.context('../src', true, /.stories.(j|t)s$/);
function loadStories() {
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
