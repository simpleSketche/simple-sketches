from flask import Flask
from vectorize_floor_plan import get_contours
from vectorize_floor_plan import filter_image
import json
import os
import numpy as np


app = Flask(__name__)


@app.route("/<image_name>/<tolerance>/<min_size>/<contour_noise_tolerance>")
def convert_image_to_coords(image_name, tolerance, min_size, contour_noise_tolerance):

    input_path = select_floor_plans(image_name)

    output_path = "grasshopper/generated floor plans/erosion.jpg"
    input_path_2 = os.path.join("C:/Users/yanga/YZ_startup/"+input_path)

    filter_image(input_path, output_path, int(tolerance), int(min_size))
    contour_coords = get_contours(output_path, int(contour_noise_tolerance))
    test = np.array(contour_coords)
    test = test.tolist()
    dict_json = {
        "data": test,
        "input_path": input_path_2
    }

    return dict_json


def select_floor_plans(image_name):
    image_path = str(image_name) + ".jpg"
    floor_plan_parent_path = "grasshopper/floor plans/" + image_path
    return floor_plan_parent_path


# turn the debug mode to False everytime you are done with this file.
if __name__ == "__main__":
    app.run(debug=True)
