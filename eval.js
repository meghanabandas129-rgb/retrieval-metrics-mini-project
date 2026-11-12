const fs = require("node:fs");
const path = require("node:path");

const csv = fs.readFileSync(path.join(__dirname, "test-set.csv"), "utf8");
const searchResults = JSON.parse(
  fs.readFileSync(path.join(__dirname, "search-results.json"), "utf8")
);

const testSet = csv.trim().split(/\r?\n/).slice(1).map((line) => {
  const separator = line.lastIndexOf(",");
  const query = line.slice(0, separator).trim()
    .replace(/^"|"$/g, "")
    .replace(/""/g, '"');
  const correctIds = new Set(
    line.slice(separator + 1).trim()
      .replace(/^"|"$/g, "")
      .split(";")
      .map((id) => id.trim())
  );

  return { query, correctIds };
});

function firstCorrectRank(rankedIds, correctIds) {
  const index = rankedIds.slice(0, 10)
    .findIndex((id) => correctIds.has(String(id)));
  return index + 1;
}

function reciprocalRank(rank) {
  return rank === 0 ? 0 : 1 / rank;
}

const scores = {
  keyword: { totalRR: 0, hits: 0 },
  semantic: { totalRR: 0, hits: 0 },
};

console.log("| Query | Keyword rank | Semantic rank |");
console.log("|---|---|---|");

for (const { query, correctIds } of testSet) {
  const results = searchResults[query];
  if (!results) {
    throw new Error(`Missing search results for query: ${query}`);
  }

  const keywordRank = firstCorrectRank(results.keyword, correctIds);
  const semanticRank = firstCorrectRank(results.semantic, correctIds);

  scores.keyword.totalRR += reciprocalRank(keywordRank);
  scores.semantic.totalRR += reciprocalRank(semanticRank);
  scores.keyword.hits += Number(keywordRank > 0);
  scores.semantic.hits += Number(semanticRank > 0);

  console.log(`| ${query} | ${keywordRank || "miss"} | ${semanticRank || "miss"} |`);
}

function summary({ totalRR, hits }) {
  const mrr = (totalRR / testSet.length).toFixed(2);
  const recall = (hits / testSet.length).toFixed(2);
  return `**MRR ${mrr} · Recall@10 ${recall}**`;
}

console.log(`| **Summary** | ${summary(scores.keyword)} | ${summary(scores.semantic)} |`);