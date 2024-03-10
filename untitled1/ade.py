import twint

c = twint.Config()
c.Search = "bitcoin OR ethereum"
c.Lang = "en"
c.Store_csv = True
c.Output = "crypto_tweets.csv"

count = 0
max_tweets = 100000
tweets_per_query = 1000
num_queries = max_tweets // tweets_per_query

for i in range(num_queries):
    twint.run.Search(c)
    count += tweets_per_query
    c.Until = twint.storage.panda.Tweets_df.iloc[-1].datestamp
    print("Retrieved {count} tweets so far")
    if count >= max_tweets:
        break

print("Finished retrieving 100,000 tweets")