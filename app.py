from flask import Flask,render_template, request, jsonify
import pandas as pd
import json

app = Flask(__name__,template_folder="templates")

@app.route("/")
def hello():
    return render_template('index.html')

@app.route('/processData', methods=['POST'])
def processData():
    globalDev = pd.read_json(json.dumps(request.get_json()['global_development']))
    countriesReg = pd.read_json(json.dumps(request.get_json()['countries_regions']))
    joinDf = pd.merge(globalDev, countriesReg, left_on='Country', right_on='name')
    return joinDf.to_json(orient="records")

if __name__ == '__main__':
    app.run(debug=True)