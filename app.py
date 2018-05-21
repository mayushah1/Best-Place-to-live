import os
import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
app = Flask(__name__)


#################################################
# Database Setup
#################################################
dbfile = os.path.join('db', 'school_data.sqlite')
engine = create_engine(f"sqlite:///{dbfile}")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to each table
School_Data = Base.classes.school_data
# OTU = Base.classes.otu
# Samples = Base.classes.samples

# Create our session (link) from Python to the DB
session = Session(engine)


@app.route("/")
def index():
    """Return the homepage."""
    return render_template('index.html')


@app.route('/cities')
def cities():
    """Return a list of cities."""
    results = session.query(School_Data.city).distinct()
    return jsonify(list(results))

@app.route('/schools/<city>')
def schools():
    """Return a list of schools of the selected city."""
    results = session.query(School_Data.school_name).\
        filter(School_Data.city == city).all()
    return jsonify(list(results))


# @app.route('/otu')
# def otu():
#     """Return a list of OTU descriptions."""
#     results = session.query(OTU.lowest_taxonomic_unit_found).all()

#     # Use numpy ravel to extract list of tuples into a list of OTU descriptions
#     otu_list = list(np.ravel(results))
#     return jsonify(otu_list)


@app.route('/metadata/<sample>')
def school_metadata(sample):
    """Return the MetaData for a given school."""
    sel = [School_Data.city, School_Data.enrollment,
           School_Data.graderange, School_Data.phone,
           School_Data.school_name, School_Data.school_type,
           School_Data.website]

    results = session.query(*sel).\
        filter(School_Data.city == sample).all()

    # Create a dictionary entry for each row of metadata information
    school_metadata = {}
    for result in results:
        school_metadata['city'] = result[0]
        school_metadata['enrollment'] = result[1]
        school_metadata['graderange'] = result[2]
        school_metadata['phone'] = result[3]
        school_metadata['school_name'] = result[4]
        school_metadata['school_type'] = result[5]
        school_metadata['website'] = result[6]

    return jsonify(school_metadata)


@app.route('/rating/<sample>')
def school_rating(sample):
    """Return the school as a number."""

    results = session.query(School_Data.parentrating).\
        filter(School_Data.sid == "5af7493818e4261b6296a900").all()
    rating = np.ravel(results)

    # Return only the first integer value for washing frequency
    return jsonify(int(rating[0]))


@app.route('/samples/<sample>')
def samples(sample):
    """Return a list dictionaries containing `otu_ids` and `sample_values`."""
    stmt = session.query(School_Data).statement
    df = pd.read_sql_query(stmt, session.bind)

    # Make sure that the sample was found in the columns, else throw an error
    if sample not in df.columns:
        return jsonify(f"Error! Sample: {sample} Not Found!"), 400

    # Return any sample values greater than 1
    df = df[df[sample] > 1]

    # Sort the results by sample in descending order
    df = df.sort_values(by=sample, ascending=0)          

    # Format the data to send as json
    data = [{
        "otu_ids": df[sample].index.values.tolist(),
        "sample_values": df[sample].values.tolist()
    }]
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)



















# from flask import (
#     Flask, render_template, jsonify, redirect
#     )
# from flask_pymongo import PyMongo
# # from flask_sqlalchemy import SQLAlchemy
# # if using SQLAlchemy see 512 Visualizations Part 3, activity 3

# # import scrape_mars

# app = Flask(__name__)

# mongo = PyMongo(app)


# @app.route("/")
# def index():
#     mars_data = mongo.db.mars_data.find_one()
#     return render_template("index.html", mars_data=mars_data)


# @app.route("/scrape")
# def scrape():
#     mars_data = mongo.db.mars_data
#     scrape_data = scrape_mars.scrape()
#     mars_data.update(
#         {},
#         scrape_data,
#         upsert=True
#     )
#     return redirect("http://localhost:5000/", code=302)


# if __name__ == "__main__":
#     app.run(debug=True)
