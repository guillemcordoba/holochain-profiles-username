import plugins from './web-dev-server.plugins.mjs';

export default {
  files: 'test/**/*.test.js',
  nodeResolve: {
    browser: true,
  },
  plugins,
};
