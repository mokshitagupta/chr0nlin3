import requests
import time, csv, re, json


CSV_FILE="./output.csv"
escapes = ''.join([chr(char) for char in range(1, 32)])
translator = str.maketrans('', '', escapes)

MAX_REQUESTS_PER_SECOND=45
# Loop counter - how many times you want to hit the endpoint
COUNT=20

# Offset increment (e.g., if each page has 10 items, the offset would increment by 10)
OFFSET_INCREMENT=500

LIMIT=900857//2



genres = {}

genresli = json.load(open("./genres.json"))["genres"]
for g in genresli:
    genres[g["id"]] = g["name"]

COUNT = 500

pop = "asc"
#desc
year = 2007
SPAN = 8

# print(COUNT, genres)

def runQueries(acc,year,pop, ct):
    sent = 0

    print("running for: ", year, pop, ct)
    for i in range(ct):
        sent +=1
        if sent >= MAX_REQUESTS_PER_SECOND:
            sent = 0
            time.sleep(0.5)

        url = f"https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&page={str(i+1)}&sort_by=popularity.{pop}&primary_release_year={str(year)}&language=en-US"
        # print(url)

        response = requests.get(url, 
                            **{'headers': {
                                            "Authorization": "Bearer "
                                        },
                            })

        try: 

            res = response.json()
            # print(len(res))
            if "succes" in res and res["succes"] == False:
                print(i+1)
                return acc
            response = res["results"]
            # print(response[0])
            for row in response:
                company = ""
                title = row["original_title"]
                url = ""
                genre = ""
                date = ""
                summary = ""
                rating = ""


                if "poster_path" in row and row["poster_path"] is not None:
                    url = "https://image.tmdb.org/t/p/w500/"+row["poster_path"]+".jpg" 

                if "genre_ids" in row and len(row["genre_ids"])>0:
                    genre = genres[row["genre_ids"][0]]

                if "release_date" in row:
                    date = row["release_date"]

                if "overview" in row:
                    summary = row["overview"].strip()
                    summary = summary.translate(translator)

                if "vote_average" in row:
                    rating = row["vote_average"]

                acc.append([company,title, url,genre, date ,summary,rating])

            # print(len(acc))
        except KeyError as k:
            print(response.json(), "except", i+1, url)
            continue


    return acc

def mainLoop():
    
    for i in range(SPAN):
        acc = []
        url = f"https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&page=1&sort_by=popularity.asc&primary_release_year={str(year-i)}&language=en-US"

        response = requests.get(url, 
                            **{'headers': {
                                            "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTlmMmUzNzlmODZiYmE0MWMwMWRiODNmMzBkN2RiMiIsInN1YiI6IjY1NjMxYzZkYjIzNGI5MDBlMmM3YTM0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fwnC_viJ0tZd-1EZwzziBDMday3eDvKXR5e3nMjJDug"
                                        },
                            })
        total = int(response.json()["total_pages"])
        acc = runQueries(acc, year - i, "asc", 500)
        acc = runQueries(acc, year - i, "desc", max(total-500,0))
        with open('./out.csv', 'a', newline='') as f:
            writer = csv.writer(f)
            writer.writerows(acc)

# mainLoop()

# with open('./out.csv', 'w', newline='') as f:
#     writer = csv.writer(f)
#     writer.writerows(acc)

# print(acc)

    # print ("response: %s" % str(response.json()))