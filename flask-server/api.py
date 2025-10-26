from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort
from sqlalchemy import select
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)
api = Api(app)


class FilmModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    duration = db.Column(db.Integer)
    reviews = db.Column(db.Integer)
    description = db.Column(db.Text)

    def __repr__(self) -> str:
        return f"Film(title = {self.title} duration={self.duration} reviews={self.reviews} description={self.description})"


film_args = reqparse.RequestParser()
film_args.add_argument('title', type=str, required=True,
                       help="title can't be blank")
film_args.add_argument('duration', type=int)
film_args.add_argument('reviews', type=int)
film_args.add_argument('description', type=str)

userFields = {
    'id': fields.Integer,
    'title': fields.String,
    'duration': fields.Integer,
    'reviews': fields.Integer,
    'description': fields.String
}


class Films(Resource):
    @marshal_with(userFields)
    def get(self):
        # films = db.select(FilmModel)
        films = db.session.scalars(db.select(FilmModel)).all()
        # films = FilmModel.query.all()
        return films

    @marshal_with(userFields)
    def post(self):
        args = film_args.parse_args()
        film = FilmModel(
            title=args['title'], duration=args['duration'],
            reviews=args['reviews'], description=args['description'])
        db.session.add(film)
        db.session.commit()
        return film


class FilmItem(Resource):
    @marshal_with(userFields)
    def get(self, id):
        film = db.session.scalar(
            db.select(FilmModel).where(FilmModel.id == id))
        return film

    @marshal_with(userFields)
    def put(self, id):


api.add_resource(Films, '/api/films')
api.add_resource(FilmItem, '/api/films/<int:id>')


@app.route('/')
def home():
    return "heelo"


if __name__ == '__main__':
    app.run()
