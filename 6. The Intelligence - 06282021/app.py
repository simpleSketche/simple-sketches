from flask import Flask, request
import numpy as np
import tensorflow as tf
import os


app = Flask(__name__)
cur_path = os.getcwd()
model_path = os.path.join(cur_path, "decoder")
print(model_path)
model = tf.keras.models.load_model(model_path)

@app.route('/test', methods=["POST", "GET"])
def test():
    if request.method == "POST":
        input_data = request.get_json()
        z_vals = input_data["data"]
        z_samples = np.array([z_vals])
        pred = model.predict(z_samples)
        result_data = (pred[0] * 255.0).tolist()

        dict_json = {
            "data": result_data
        }
        return dict_json

    if request.method == "GET":
        return {"data": 'something else'}
    else:
        return "hello"

# remember to turn the debug to False when you done running the file!!!
if __name__ == "__main__":
    app.run(debug=False)
