from flask import (
    Flask, render_template, jsonify, redirect
    )
from flask_pymongo import PyMongo
# from flask_sqlalchemy import SQLAlchemy
# if using SQLAlchemy see 512 Visualizations Part 3, activity 3

# import scrape_mars

app = Flask(__name__)

mongo = PyMongo(app)


@app.route("/")
def index():
    mars_data = mongo.db.mars_data.find_one()
    return render_template("index.html", mars_data=mars_data)


@app.route("/scrape")
def scrape():
    mars_data = mongo.db.mars_data
    scrape_data = scrape_mars.scrape()
    mars_data.update(
        {},
        scrape_data,
        upsert=True
    )
    return redirect("http://localhost:5000/", code=302)


if __name__ == "__main__":
    app.run(debug=True)
