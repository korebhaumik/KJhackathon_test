from flask import Flask,request,render_template
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# @app.after_request
# def after_request(response):
#   response.headers.add('Access-Control-Allow-Origin', '*')
#   response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
#   response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
#   return response
# app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy   dog'
# app.config['CORS_HEADERS'] = 'Content-Type'

# cors = CORS(app, resources={r"/foo": {"origins": "http://localhost:5000"}})

# newNum = 0 
# @app.route("/add_number", methods=['POST'])
# def add_number():
#     newNum = request.get_json()
#     return 'Done', 201
@app.route("/value")
def value():
    return {"numbers": [{"value":1},{"value":2},{"value":3}]}

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/add_number", methods=['POST'])
def add_number():
    request_data = request.get_json()
    num = request_data['number']
    print(num)
    return {"numbers": num}

@app.route('/upload', methods=['POST'])
def fileUpload():
    file = request.files['file'] 
    print(file)
    return {"imgFile": file}

# @app.route('/json-example', methods=['POST'])
# def json_example():
#     return 'JSON Object Example'
# GET requests will be blocked




@app.route('/json-example', methods=['POST'])
def json_example():
    request_data = request.get_json()

    language = request_data['language']
    framework = request_data['framework']

    # two keys are needed because of the nested object
    python_version = request_data['version_info']['python']

    # an index is needed because of the array
    example = request_data['examples'][0]

    boolean_test = request_data['boolean_test']

    return '''
           The language value is: {}
           The framework value is: {}
           The Python version is: {}
           The item at index 0 in the example list is: {}
           The boolean value is: {}'''.format(language, framework, python_version, example, boolean_test)
if __name__ == "__main__":
    app.run(debug=True)