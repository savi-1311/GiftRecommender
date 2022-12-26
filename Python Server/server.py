# using flask_restful
from similarity import *
from flask import Flask, jsonify, request
from flask_restful import Resource, Api
  
# creating the flask app
app = Flask(__name__)
# creating an API object
api = Api(app)
  
# making a class for a particular resource
# the get, post methods correspond to get and post requests
# they are automatically mapped by flask_restful.
# other methods include put, delete, etc.
class Hello(Resource):
  
    # corresponds to the GET request.
    # this function is called whenever there
    # is a GET request for this resource
    def get(self):
  
        return jsonify({'message': 'hello world'})
  
    # Corresponds to POST request
    def post(self):
          
        data = request.get_json()     # status code
        print(data)
        
        n = len(data['keywords'])
        print(n)
        
        result = []
        
        for i in range(0, n):
            m = len(data['keywords'][i])
            print(m)
            similarityDict = {}
 
        # Printing all elements in ith 1-D array
            for j in range(0, m):
 
            # Printing jth element of ith row
                keyword = data['keywords'][i][0] + " " + data['keywords'][i][j]
                similarity_score = get_similarity(keyword)
                print(similarity_score)
                similarityDict[data['keywords'][i][j]] = similarity_score
            result.append(similarityDict)
            
        print(result)        
        return jsonify({'data': result})
  
  
# adding the defined resources along with their corresponding urls
api.add_resource(Hello, '/')
  
  
# driver function
if __name__ == '__main__':
  
    app.run(debug = True)