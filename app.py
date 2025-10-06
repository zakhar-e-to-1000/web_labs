from flask import Flask, url_for, send_file, request
import sqlite3
app = Flask(__name__, static_url_path="/", static_folder='frontend')


def dict_factory(cursor, row):
    fields = [column[0] for column in cursor.description]
    return {key: value for key, value in zip(fields, row)}


def init_db():
    con = sqlite3.connect('database.db')
    cur = con.cursor()
    # cur.execute('DROP TABLE film')
    cur.execute('''
    CREATE TABLE IF NOT EXISTS film
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    duration REAL,
    reviews INT) STRICT
''')
    con.close()


def db_select_all(cur: sqlite3.Cursor):
    res = cur.execute('SELECT * FROM film')
    return res.fetchall()


def db_insert(cur: sqlite3.Cursor, params):
    cur.execute('''
    INSERT INTO film (name, duration, reviews)
    VALUES (:name, :duration, :reviews)
''', (params))


def db_delete(cur: sqlite3.Cursor, id):
    cur.execute('''
    DELETE FROM film WHERE id = ?
''', (int(id),))


def db_update(cur: sqlite3.Cursor, params):
    cur.execute('''
    UPDATE film
    SET name = :name,
        duration = :duration,
        reviews = :reviews
    WHERE id = :id
''', params)


@app.route('/')
def index():
    return send_file('frontend/index.html')


@app.route('/film', methods=['GET'])
def films_get():
    preffix = request.args.get('s', '', str)
    sort_param = request.args.get('sort', 'none', str)
    # app.logger.info(str(preffix)+' '+str(sort_param))
    con = sqlite3.connect('database.db')
    con.row_factory = dict_factory
    cur = con.cursor()
    films = db_select_all(cur)
    res = filter(lambda e: e['name'].lower().startswith(
        preffix.strip().lower()), films)
    con.close()
    if sort_param != 'none':
        res = list(sorted(res, key=lambda e: e[sort_param]))
    return list(res)


@app.route('/film', methods=['POST'])
def films_post():
    film_params = request.json
    con = sqlite3.connect('database.db')
    cur = con.cursor()
    # app.logger.debug(f'A value for debugging {film_params}')
    db_insert(cur, film_params)
    con.commit()
    con.close()
    return ("ok", 200)


@app.route('/film/<int:film_id>', methods=['DELETE'])
def film_delete(film_id):
    con = sqlite3.connect('database.db')
    cur = con.cursor()
    db_delete(cur, film_id)
    con.commit()
    con.close()
    return ('ok', 200)


@app.route('/film/<int:film_id>', methods=['PUT'])
def film_update(film_id):
    film_params = request.json
    if film_params != None:
        film_params['id'] = film_id
    con = sqlite3.connect('database.db')
    cur = con.cursor()
    db_update(cur, film_params)
    con.commit()
    con.close()
    return ('ok', 200)


if __name__ == '__main__':
    init_db()
