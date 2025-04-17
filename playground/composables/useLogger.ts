export function useLogger() {
  const { $logger } = useNuxtApp()
  
  const log = (message: string) => {
    $logger.info(message)
  }
  
  return {
    log
  }
}
