'use client';

import { useEffect, useState } from 'react';
import snapshot from './snapshot.json';
import { createReleaseClient, normalizeRelease, syncReleaseSchema, RELEASE_TTL, type ReleaseSnapshot } from './release.mjs';

export const INITIAL_RELEASE = normalizeRelease(snapshot);
let client: ReturnType<typeof createReleaseClient> | undefined;

export function useNauticRelease() {
  // Identical initial state on server and client keeps hydration consistent.
  const [release, setRelease] = useState(INITIAL_RELEASE);
  useEffect(() => {
    let active = true;
    let storage: Storage | undefined;
    try { storage = window.localStorage; } catch { /* Storage can be disabled. */ }
    client ??= createReleaseClient(snapshot as ReleaseSnapshot, { storage });
    const currentClient = client;
    const refresh = () => {
      if (document.visibilityState === 'hidden') return;
      void currentClient.refresh().then((next) => {
        if (active) {
          setRelease(next);
          syncReleaseSchema(next, document);
        }
      });
    };
    const cached = currentClient.current();
    // Reading storage is deferred until after hydration.
    void Promise.resolve().then(() => {
      if (active) { setRelease(cached); syncReleaseSchema(cached, document); }
    });
    refresh();
    const timer = window.setInterval(refresh, RELEASE_TTL);
    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      active = false;
      window.clearInterval(timer);
      window.removeEventListener('focus', refresh);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, []);
  return release;
}
