import mysql.connector
import csv


acc = []

mydb = mysql.connector.connect(
  host="oceanus.cse.buffalo.edu",
  user="mgupta8",
  password="50394739",
  database="cse442_2023_fall_team_i_db"
)

mycursor = mydb.cursor()

sql = "INSERT INTO media (media_type, description, release_date, google_id, media_name, score, creator) VALUES ('Book', '', %s, -1, %s, %s, %s)"



# add = "ALTER TABLE media ADD release_date TEXT;"
# add2 = "ALTER TABLE media ADD google_id INT;"
# add3 = "ALTER TABLE media ADD description TEXT;"

# mycursor.execute(add)
# mycursor.execute(add2)
# mycursor.execute(add3)





with open('loadingdb/books/books.csv') as csvfile:
    spamreader = csv.reader(csvfile)
    for i,row in enumerate(spamreader):


        title = row[1] if 1 < len(row) else ""
        authors = row[2] if 2 < len(row) else ""
        vote_average = row[3] if 3 < len(row) else ""
        release_date = row[10] if 10 < len(row) else ""

        
       
        if i == 0:
            print(title, authors, vote_average, release_date)
            continue
            #"", release_date, -1, media_name, score, creator

        try:
            vote_average= float(vote_average)
        except ValueError as v:
            print("trashed")
            vote_average = 0

        acc.append([
            release_date,
            title,
            float(vote_average),
            release_date,
        ])

# print(acc)
# mycursor.executemany(sql, acc)
# mydb.commit()
# print(mycursor.rowcount, "record inserted.")