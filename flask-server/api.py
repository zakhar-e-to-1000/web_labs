from flask import Flask, url_for, send_file, request
import sqlite3
app = Flask(__name__, static_url_path="/", static_folder='frontend')
DATABASE_PATH = 'database.db'


def dict_factory(cursor, row):
    fields = [column[0] for column in cursor.description]
    return {key: value for key, value in zip(fields, row)}


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


def db_select_all(cur: sqlite3.Cursor):
    res = cur.execute('SELECT * FROM film')
    return res.fetchall()


def db_select(cur: sqlite3.Cursor, id):
    res = cur.execute('''
        SELECT * FROM film
        WHERE id=?
    ''', (id,))
    return res.fetchone()


def db_insert(cur: sqlite3.Cursor, params):
    cur.execute('''
    INSERT INTO film (title, duration, reviews, description)
    VALUES (:title, :duration, :reviews, :description)
''', (params))
    params['id'] = cur.lastrowid
    return params


def db_delete(cur: sqlite3.Cursor, id):
    cur.execute('''
    DELETE FROM film WHERE id = ?
''', (int(id),))


def db_put(cur: sqlite3.Cursor, params):
    cur.execute('''
    UPDATE film
    SET title = :title,
        duration = :duration,
        reviews = :reviews
        description = :description
    WHERE id = :id
''', params)


@app.route('/')
def index():
    return send_file('frontend/index.html')


@app.route('/api/films', methods=['GET'])
def films_get():
    preffix = request.args.get('s', '', str)
    sort_param = request.args.get('sort', 'none', str)
    # app.logger.info(str(preffix)+' '+str(sort_param))
    con = sqlite3.connect(DATABASE_PATH)
    con.row_factory = dict_factory
    cur = con.cursor()
    films = db_select_all(cur)
    res = filter(lambda e: e['title'].lower().startswith(
        preffix.strip().lower()), films)
    con.close()
    if sort_param != 'none':
        res = list(sorted(res, key=lambda e: e[sort_param]))
    return list(res)


@app.route('/api/films', methods=['POST'])  # type: ignore
def films_post():
    film_params = request.json
    con = sqlite3.connect(DATABASE_PATH)
    cur = con.cursor()
    # app.logger.debug(f'A value for debugging {film_params}')
    inserted = db_insert(cur, film_params)
    con.commit()
    con.close()
    return inserted, 201


@app.route('/api/films/<int:film_id>', methods=['GET'])  # type: ignore
def film_get(film_id):
    con = sqlite3.connect(DATABASE_PATH)
    con.row_factory = dict_factory
    cur = con.cursor()
    res = db_select(cur, film_id)
    return res, 200


@app.route('/api/films/<int:film_id>', methods=['DELETE'])
def film_delete(film_id):
    con = sqlite3.connect(DATABASE_PATH)
    cur = con.cursor()
    db_delete(cur, film_id)
    con.commit()
    con.close()
    return ('ok', 200)


@app.route('/api/films/<int:film_id>', methods=['PUT'])
def film_update(film_id):
    film_params = request.json
    if film_params != None:
        film_params['id'] = film_id
    con = sqlite3.connect(DATABASE_PATH)
    cur = con.cursor()
    db_put(cur, film_params)
    con.commit()
    con.close()
    return ('ok', 200)


if __name__ == '__main__':
    app.run()
