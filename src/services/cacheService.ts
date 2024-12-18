import { db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { openDB, IDBPDatabase } from 'idb';

interface CacheConfig {
  name: string;
  version: number;
  stores: string[];
}

class CacheService {
  private db: IDBPDatabase | null = null;
  private config: CacheConfig = {
    name: 'app-cache',
    version: 1,
    stores: ['patients', 'prescriptions', 'activities']
  };

  async init() {
    this.db = await openDB(this.config.name, this.config.version, {
      upgrade(db) {
        for (const store of this.config.stores) {
          if (!db.objectStoreNames.contains(store)) {
            db.createObjectStore(store);
          }
        }
      }
    });
  }

  async get<T>(store: string, key: string): Promise<T | null> {
    if (!this.db) await this.init();
    return this.db!.get(store, key);
  }

  async set<T>(store: string, key: string, value: T): Promise<void> {
    if (!this.db) await this.init();
    await this.db!.put(store, value, key);
  }

  async clear(store: string): Promise<void> {
    if (!this.db) await this.init();
    await this.db!.clear(store);
  }

  async clearAll(): Promise<void> {
    if (!this.db) await this.init();
    for (const store of this.config.stores) {
      await this.clear(store);
    }
  }
}

export const cacheService = new CacheService();