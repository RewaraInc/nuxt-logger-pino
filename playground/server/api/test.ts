import {testFunction} from "../utils/testService";
import { logger } from '#pino-klogger'
export default defineEventHandler((event) => {

  console.log('In server API: ', event.path)
  event.context.logger.info('API endpoint called. Logging using event.context.logger. You will see the path printed below.')
  logger.info('API endpoint called. Logging using logger. You will NOT see the path printed below.')
  testFunction()
  // Example error logging
  try {
    // Simulate error
    throw new Error('Something went wrong. LOL. Just Kidding. Showing how to log an error')
  } catch (error) {
    event.context.logger.error(error)
  }
  
  return { message: 'Logged successfully' }
})
