/// <reference types="vite-plugin-pwa/client" />

import './PWABadge.css'
import { useState } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

export function PWABadge() {
  const [needRefresh, setNeedRefresh] = useState(false)
  const {
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(registration: ServiceWorkerRegistration | undefined) {
      console.log('SW Registered:', registration)
    },
    onRegisterError(error: Error) {
      console.log('SW registration error', error)
    },
    onNeedRefresh() {
      setNeedRefresh(true)
    },
  })

  const close = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  return (
    <>
      {(offlineReady || needRefresh) && (
        <div className="fixed bottom-0 right-0 m-4 p-3 bg-white border border-gray-300 rounded shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm mr-2">
              {offlineReady
                ? 'App ready to work offline'
                : 'New content available, click on reload button to update.'}
            </span>
            {needRefresh && (
              <button
                className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => updateServiceWorker(true)}
              >
                Reload
              </button>
            )}
            <button
              className="ml-2 text-sm text-gray-500 hover:text-gray-700"
              onClick={() => close()}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
