import createApp from './app';
import getConfig from './config';

const config = getConfig(process.env.NODE_ENV);

// this allows for dependency injection of the config object for testing
const app = createApp(config);

app.listen(config.port || 3000);
