// Site settings. Edit these, nothing else needs to change.
const CONFIG = {
  address: 'cloudblock.cloud',
  // Address used for the live status check. Add ?status=<host> to the page URL to test another one.
  statusAddress: 'cloudblock.cloud',
  // Permanent Discord invite, e.g. 'https://discord.gg/abc123'. Discord buttons stay hidden while empty.
  discordUrl: 'https://discord.gg/BHaqZDu3X6',
}

// ---------- copy the server address ----------
const copyButton = document.getElementById('copy-ip')
const copyHint = document.getElementById('copy-hint')
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(CONFIG.address)
    copyHint.textContent = 'Copied!'
  } catch {
    // Clipboard blocked: select the text so the visitor can copy it by hand.
    const range = document.createRange()
    range.selectNodeContents(document.getElementById('ip-value'))
    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
    copyHint.textContent = 'Press Ctrl+C'
  }
  setTimeout(() => { copyHint.textContent = 'Click to copy' }, 2000)
})

// ---------- Discord links ----------
if (CONFIG.discordUrl) {
  for (const link of document.querySelectorAll('[data-discord]')) {
    link.href = CONFIG.discordUrl
    link.target = '_blank'
    link.rel = 'noopener'
    link.hidden = false
  }
}

// ---------- live server status ----------
const statusEl = document.getElementById('status')
const statusText = document.getElementById('status-text')

async function refreshStatus () {
  const override = new URLSearchParams(location.search).get('status')
  const host = override || CONFIG.statusAddress
  try {
    const response = await fetch(`https://api.mcsrvstat.us/3/${encodeURIComponent(host)}`, { cache: 'no-store' })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const data = await response.json()
    statusEl.classList.remove('online', 'offline')
    if (data.online) {
      statusEl.classList.add('online')
      const n = data.players?.online ?? 0
      statusText.textContent = `Online · ${n} ${n === 1 ? 'player' : 'players'} playing`
    } else {
      statusEl.classList.add('offline')
      statusText.textContent = 'Offline · back soon'
    }
  } catch {
    statusText.textContent = 'Status unavailable'
  }
}
refreshStatus()
setInterval(refreshStatus, 60_000)

// ---------- weekly competition countdown (Monday 00:00 UTC) ----------
function nextMondayUtc (now) {
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
  const daysUntil = ((8 - d.getUTCDay()) % 7) || 7
  d.setUTCDate(d.getUTCDate() + daysUntil)
  return d
}

const countdownEl = document.getElementById('countdown')
function tick () {
  const now = new Date()
  let left = Math.max(0, nextMondayUtc(now) - now)
  const days = Math.floor(left / 86_400_000); left -= days * 86_400_000
  const hours = Math.floor(left / 3_600_000); left -= hours * 3_600_000
  const minutes = Math.floor(left / 60_000)
  countdownEl.textContent = `${days}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m`
}
tick()
setInterval(tick, 30_000)
