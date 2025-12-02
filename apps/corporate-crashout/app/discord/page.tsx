import { requireActiveSubscription } from '@/lib/auth-helpers'

export default async function DiscordPage() {
  await requireActiveSubscription()

  const discordUrl = process.env.DISCORD_INVITE_URL || 'https://discord.gg/example'

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Discord Community</h1>

      <div className="border border-gray-800 rounded-lg p-6 bg-gray-900/50">
        <p className="mb-4 text-gray-300">
          Join our private Discord community to connect with other traders, get support, and stay updated.
        </p>
        <a
          href={discordUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Join Discord Server
        </a>
      </div>
    </div>
  )
}

