import sqlite3
from api import db_insert
import os
import random
DATABASE_PATH = 'database.db'


def random_lorem():
    lorem = "Curabitur ac magna ut enim elementum mattis. Integer sit amet metus nec urna lacinia rhoncus sed quis odio. Cras nisi dui, vulputate tincidunt convallis at, aliquet non turpis. Donec tincidunt velit eu nisi interdum, eget pharetra erat tempor. Vivamus lobortis nunc non nibh congue, non iaculis erat dapibus. Aenean mattis, lorem nec dictum aliquam, urna quam tempus metus, nec efficitur tortor tortor ut felis. Cras eu tristique diam, semper convallis libero. Vivamus id ante lectus. Morbi pulvinar eros hendrerit sapien dignissim facilisis. Praesent vitae justo ac arcu consequat volutpat nec sit amet magna. Phasellus dignissim egestas augue quis lobortis. Mauris in viverra sem. Vestibulum eu suscipit neque. Duis non est lorem. Duis mattis tortor sit amet volutpat vehicula. Duis dolor massa, auctor non molestie ac, convallis quis risus. "
    start = random.randint(0, len(lorem)//2)
    return lorem[start:]


def init_db():
    con = sqlite3.connect(DATABASE_PATH)
    cur = con.cursor()
    # cur.execute('DROP TABLE film')
    cur.execute('''
    CREATE TABLE IF NOT EXISTS film
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    duration INT,
    reviews INT,
    description TEXT) STRICT
''')
    con.close()


def main():
    if os.path.exists(DATABASE_PATH):
        os.remove(DATABASE_PATH)
    init_db()
    con = sqlite3.connect(DATABASE_PATH)
    cur = con.cursor()
    num = 100
    for i in range(num):
        suffix = chr(ord('a')+(i % 10))+chr(ord('a')+(i // 10))
        name = "Film "+suffix
        params = {
            'title': name,
            'duration': random.randint(1, 240),
            'reviews': random.randint(1_000, 100_000),
            'description': random_lorem()
        }

        db_insert(cur, params)
    con.commit()
    con.close()


if __name__ == '__main__':
    main()

# function randomLorem() {
#     const lorem = "Curabitur ac magna ut enim elementum mattis. Integer sit amet metus nec urna lacinia rhoncus sed quis odio. Cras nisi dui, vulputate tincidunt convallis at, aliquet non turpis. Donec tincidunt velit eu nisi interdum, eget pharetra erat tempor. Vivamus lobortis nunc non nibh congue, non iaculis erat dapibus. Aenean mattis, lorem nec dictum aliquam, urna quam tempus metus, nec efficitur tortor tortor ut felis. Cras eu tristique diam, semper convallis libero. Vivamus id ante lectus. Morbi pulvinar eros hendrerit sapien dignissim facilisis. Praesent vitae justo ac arcu consequat volutpat nec sit amet magna. Phasellus dignissim egestas augue quis lobortis. Mauris in viverra sem. Vestibulum eu suscipit neque. Duis non est lorem. Duis mattis tortor sit amet volutpat vehicula. Duis dolor massa, auctor non molestie ac, convallis quis risus. "
#     let rand = Math.floor(Math.random() / 2 * lorem.length)
#     return lorem.slice(rand)
# }

# export default function getFilms(count) {
#     const films = []
#     for (let num=1
#          num < count + 1
#          num++) {
#         films.push({
#             title: `Film ${num}`,
#             id: num,
#             duration: Math.floor(Math.random() * 240),
#             reviews: Math.floor(Math.random() * 10_000),
#             description: randomLorem()
#         })
#     }
#     return films
# }
