import { Inventory, Status } from "./models";

const MAX_RETRIES = 3;
const SKU_PATTERN = /^[A-Z]{3}-\d+$/i;
const isProduction = false;

type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };
type ReadonlyKeys<T> = { [K in keyof T]-?: T[K] extends Function ? never : K }[keyof T];

interface Repository<T extends { sku: string }> {
  find(sku: T["sku"]): Promise<T | undefined>;
  save(item: T): Promise<void>;
}

function logged(_target: object, key: string, descriptor: PropertyDescriptor): void {
  const original = descriptor.value as (...args: unknown[]) => unknown;
  descriptor.value = function (this: unknown, ...args: unknown[]) {
    console.debug(`[${key}] called with ${args.length} args`);
    return original.apply(this, args);
  };
}

class Config {
  static readonly DEFAULT_TIMEOUT = 5_000;
  static readonly ENDPOINT = "https://api.example.com/v1";
}

/**
 * In-memory repository with retry support.
 * @param seed initial items to load
 */
export class MemoryRepository implements Repository<Inventory.Item> {
  private readonly items = new Map<Inventory.Sku, Inventory.Item>();
  #status: Status = Status.Draft;

  constructor(seed: Inventory.Item[] = []) {
    for (const item of seed) this.items.set(item.sku, item);
  }

  get status(): Status {
    return this.#status;
  }

  get size(): number {
    return this.items.size;
  }

  @logged
  async find(sku: Inventory.Sku): Promise<Inventory.Item | undefined> {
    if (!SKU_PATTERN.test(sku)) return undefined;
    return this.items.get(sku);
  }

  @logged
  async save(item: Inventory.Item): Promise<void> {
    this.items.set(item.sku, { ...item, tags: item.tags ?? [] });
    this.#status = Status.Active;
  }
}

export async function withRetry<T>(task: () => Promise<T>, attempts = MAX_RETRIES): Promise<Result<T>> {
  let lastError: Error | null = null;
  for (let i = 0; i < attempts; i++) {
    try {
      return { ok: true, value: await task() };
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      await new Promise((resolve) => setTimeout(resolve, Config.DEFAULT_TIMEOUT * (i + 1)));
    }
  }
  return { ok: false, error: lastError ?? new Error("unknown") };
}

const repo = new MemoryRepository([{ sku: "ABC-42", name: "Lamp", price: 19.9 }]);
const total = [...Array(repo.size).keys()].reduce((sum, n) => sum + n * 2, 0);
const label: ReadonlyKeys<Inventory.Item> = isProduction ? "sku" : "name";

export { Config, label, repo, total };
