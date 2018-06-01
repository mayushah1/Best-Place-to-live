import os
import pandas as pd
import numpy as np
from jinja2 import TemplateNotFound

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

# Create our session (link) from Python to the DB
session = Session(engine)


@app.route("/")
def render_index():
    """Return the homepage."""
    return render_template('index.html')

@app.route('/about')
def render_about():
    """Renders the About Us page."""
    return render_template('about.html')

@app.route('/tbd')
def render_tbd():
    """Renders the tbd page."""
    return render_template('tbd.html')

@app.route('/map')
def render_map():
    """Renders the Map page."""
    return render_template('map.html')

@app.route('/table')
def render_table():
    """Renders the Table page."""
    return render_template('table.html')

@app.route('/dashboard')
def render_dashboard():
    """Renders the Dashboard page."""
    return render_template('dashboard.html')



@app.route('/cities')
def cities():
    """Return a list of cities."""
    results = session.query(School_Data.city).distinct()
    return jsonify(list(results))

@app.route('/schools/<city>')
def schools(city):
    """Return a list of schools of the selected city."""
    results = session.query(School_Data.school_name).\
        filter(School_Data.city == city).all()
    return jsonify(list(results))

@app.route('/metadata/<city>')
def city_metadata(city):
    """Return the MetaData for a given city."""
    sel = [School_Data.city, School_Data.enrollment,
           School_Data.graderange, School_Data.phone,
           School_Data.school_name, School_Data.school_type,
           School_Data.website]

    results = session.query(*sel).\
        filter(School_Data.city == city).all()

    # Create a dictionary entry for each row of metadata information
    city_metadata = {}
    for result in results:
        city_metadata['city'] = result[0]
        city_metadata['enrollment'] = result[1]
        city_metadata['graderange'] = result[2]
        city_metadata['phone'] = result[3]
        city_metadata['school_name'] = result[4]
        city_metadata['school_type'] = result[5]
        city_metadata['website'] = result[6]

    return jsonify(city_metadata)


@app.route('/rating/<city>')
def city_rating(city):
    """Return the city as a number."""

    results = session.query(School_Data.parentrating).\
        filter(School_Data.sid == "5af7493818e4261b6296a900").all()
    rating = np.ravel(results)

    # Return only the first integer value for washing frequency
    return jsonify(int(rating[0]))

if __name__ == "__main__":
    app.run(debug=True)