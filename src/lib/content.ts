import {
  getCollection,
  type CollectionEntry,
  type CollectionKey
} from 'astro:content';

type OrderBy<K extends CollectionKey> = (a: CollectionEntry<K>, b: CollectionEntry<K>) => number;

export type GetPublishedOptions<K extends CollectionKey> = {
  orderBy?: OrderBy<K>;
  includeDraft?: boolean;
};

export async function getPublished<K extends CollectionKey>(
  name: K,
  opts: GetPublishedOptions<K> = {}
) {
  const prod = import.meta.env.PROD;
  const includeDraft = opts.includeDraft ?? !prod;
  const filter = includeDraft ? undefined : ({ data }: CollectionEntry<K>) => data.draft !== true;
  const items = await getCollection(name, filter);

  if (!opts.orderBy) return items;
  return items.slice().sort(opts.orderBy);
}
