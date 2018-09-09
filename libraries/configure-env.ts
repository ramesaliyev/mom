/**
 * Env Configure v0.1.0
 * 
 * This file will only load env configs if we're not in docker.
 * Yeah its ugly, but it works.
 */

import { config as getEnvVars } from 'dotenv';
import * as path from 'path';

const dirPath = __dirname;
const envPath = '/../../../../config/env/';

// Load helper.
const loadEnvFile = type =>
  getEnvVars({
    path: path.join(dirPath, `${envPath}.${type}.env`)
  });

if (!process.env.NODE_DOCKERIZED) {
  loadEnvFile('common');
  loadEnvFile('local');
}
