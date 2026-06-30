import { config } from './config/index.js'
import { sbtService } from './services/sbt.service.js'

let timer: NodeJS.Timeout | null = null
let ticking = false

async function tick(): Promise<void> {
  // Skip overlapping ticks: an on-chain mint (tx + 1 confirmation) can take
  // longer than the polling interval.
  if (ticking) return
  ticking = true
  try {
    const { processed, failed } = await sbtService.processDueIssuances()
    if (processed > 0 || failed > 0) {
      console.log(
        `[scheduler] issuances processed=${processed} failed=${failed}`
      )
    }
  } catch (err) {
    console.error(
      '[scheduler] tick failed:',
      err instanceof Error ? err.message : err
    )
  } finally {
    ticking = false
  }
}

export function startIssuanceScheduler(): void {
  if (!config.issuanceSchedulerEnabled) {
    console.log('[scheduler] disabled (ISSUANCE_SCHEDULER_ENABLED=false)')
    return
  }
  if (timer) return

  timer = setInterval(() => void tick(), config.issuanceSchedulerIntervalMs)
  timer.unref()
  console.log(
    `[scheduler] issuance scheduler started (interval ${config.issuanceSchedulerIntervalMs}ms)`
  )
  void tick()
}

export function stopIssuanceScheduler(): void {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}
