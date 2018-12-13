//import { Application } from 'typedoc/dist/lib/application';
import { Application } from 'typedoc';
import { RemoveNonDocPlugin } from './plugin';

module.exports = (PluginHost: Application) => {
  const app = PluginHost.owner;
  app.converter.addComponent('remove-internal-member', RemoveNonDocPlugin);
}
