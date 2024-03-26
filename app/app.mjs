import start from './server.mjs';
import router from './router.mjs';
import handler from './handler.mjs';

start(router, handler);
