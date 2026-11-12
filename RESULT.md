

|Query|Keyword rank|Semantic rank|
|-|-|-|
|my redis cache keeps showing old data|8|1|
|how do I add semantic search to a table I already have|miss|2|
|redis or memcached for caching|1|2|
|why did my query get slower after I added an index|miss|1|
|what does ACID actually guarantee|2|1|
|how do I keep my postgres online while changing the schema|6|3|
|my background jobs stop after every deploy|miss|2|
|how do I let my database accept more writes per second|4|1|
|sql or nosql for a new product|1|3|
|why does my redis memory keep climbing|miss|2|
|**Summary**|**MRR 0.30 ┬╖ Recall@10 0.60**|**MRR 0.67 ┬╖ Recall@10 1.00**|
||||





Semantic search performed better overall, with an MRR of 0.67 and Recall@10 of 1.00, compared with 0.30 and 0.60 for keyword search. Keyword search ranked the answer first for “redis or memcached for caching” and “sql or nosql for a new product,” both of which name the technologies being compared. Semantic search ranked the answer higher on the other eight queries, including stale Redis data, jobs stopping after a deploy, and a query slowing down after an index was added. Many of these queries describe a symptom or goal in everyday language, which can differ from the wording in the relevant post. I would keep keyword search because it can rank exact technical terms and technology comparisons higher.

