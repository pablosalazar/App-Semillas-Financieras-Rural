import { env } from "@/config/env";
import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";

const firebaseConfig = env.firebase;

const app = initializeApp(firebaseConfig);

// persistentLocalCache enables IndexedDB-backed offline support:
// - Reads are served from cache when offline
// - Writes are queued and synced automatically when connection returns
// - persistentMultipleTabManager allows multiple tabs to share the cache
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});
