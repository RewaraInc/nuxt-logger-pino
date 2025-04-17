// This shows how to use the logger from '#pino-logger' module

import { logger } from '#pino-klogger'

export function testFunction(){
    logger.info('From inside testFunction. Showing how to use the logger from a service.')
}