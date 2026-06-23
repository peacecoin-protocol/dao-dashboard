import { createApp } from './app.js';
import { config } from './config/index.js';
import { startIssuanceScheduler } from './scheduler.js';

const app = createApp();

const warnings = config.validateForStartup();
for (const warning of warnings) {
  console.warn(`[startup] ${warning}`);
}

app.listen(config.port, () => {
  console.log(`SBT backend listening on port ${config.port}`);
  startIssuanceScheduler();
});
