# Contributing to the MMJ Breeders Catalog

This is a **community-owned, open-source cannabis genetics database**. Anyone can contribute — breeders, growers, peers, and enthusiasts.

## Three ways to contribute

### 1. Use the in-app form (easiest)
- Go to https://mmj-breeders-catalog-zosomaster.zocomputer.io/breeders
- Click **"Add Breeder"** or **"Add Strain"**
- Fill the form, hit submit
- Your submission is queued for review and credited to you

### 2. Open a Pull Request (fastest path to merge)
- The data is just two JSON files:
  - `src/data/breeders.json` — list of breeders
  - `src/data/strains.json` — list of strains
- Fork the repo, edit the JSON, open a PR
- Add yourself to the contributor list (optional)

### 3. Edit on GitHub (zero setup)
- Browse the file at https://github.com/zosomaster/mmj-breeders-catalog
- Click the pencil icon to edit
- GitHub will guide you through a PR

## Breeder JSON schema

```json
{
  "name": "Humboldt Hash Mob",
  "strains": ["Monocur OG Hella Candy", "SNJ Strawnana x Meangenes Jupiter"],
  "country": "USA",
  "twitter": "@humboldthashmob",
  "instagram": "@humboldt.hash.mob",
  "website": "https://humboldthashmob.com",
  "bio": "NorCal legacy breeders specializing in loud candy-gas crosses."
}
```

Required: `name`, `country`. Everything else is optional.

## Strain JSON schema

```json
{
  "name": "Monocur OG Hella Candy",
  "slug": "monocur-og-hella-candy",
  "type": "Hybrid",
  "breeder": "Humboldt Hash Mob",
  "lineage": ["Ethos XXX", "Nerdz OG"],
  "effects": ["Relaxed", "Euphoric"],
  "flavors": ["Sweet", "Candy"],
  "terpenes": ["Limonene", "Myrcene"],
  "thc": "24",
  "cbd": "0.5",
  "description": "...",
  "ailments": ["Stress", "Pain"],
  "source": "zosomaster",
  "image": "/images/mmj-jar.jpg"
}
```

### Generating a slug
Use lowercase, hyphenated name. e.g. `Monocur OG Hella Candy` → `monocur-og-hella-candy`

### Lineage entries
Use the **parent's name** if the parent exists in the catalog, otherwise the breeder/lineage name as a string. The catalog will try to look up parents by name and by id for pedigree rendering.

## Review process

- **In-app submissions** are reviewed weekly and merged by a maintainer
- **PRs** are usually merged within 24-48 hours
- **No data deletion** — corrections are noted in commit history
- **Disputes** are resolved by community consensus on the PR thread

## What we don't accept

- ❌ Spam, ads, or self-promotion unrelated to breeding
- ❌ Strains with no breeder attribution (use "Unknown Breeder")
- ❌ Personal attacks or breeder slander — keep it factual
- ❌ Strains that don't exist or are entirely made up

## Crediting contributors

Everyone who contributes gets credited. Add your name/handle to the strain's `source` field, or open a PR that adds you to `CONTRIBUTORS.md` (coming soon).

## License

MIT — fork it, remix it, ship it. Just keep the license.

## Questions?

Open an issue on GitHub or hit the project owner @zosomaster.
