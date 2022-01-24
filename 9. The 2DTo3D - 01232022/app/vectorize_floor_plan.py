import os
import cv2
import numpy as np
import sys
import matplotlib.pyplot as plt
from PIL import Image as m
from numpy.core.fromnumeric import shape


# input_file_path = "grasshopper/floor plans/11.jpg"
# output_file_path = "grasshopper/generated floor plans/erosion.jpg"

"""
min_size : minimum size of particles we want to keep (number of pixels)
"""


def filter_image(input_file_path, output_file_path, tolerance=128, min_size=1):

    # Name of the directory containing the object detection module we're using
    IMAGE_NAME = input_file_path

    # Remove Small Items
    # 1. loads image using cv2.imread in gray scale mode.
    im_gray = cv2.imread(IMAGE_NAME, cv2.IMREAD_GRAYSCALE)

    # 2. set up the threshold to convert the image to bw mode from gray scale.
    im_bw = cv2.threshold(im_gray, tolerance, 255, cv2.THRESH_BINARY)[1]
    cv2.imwrite("grasshopper/generated floor plans/im_bw.jpg", im_bw)
    # find all the connected components
    nb_components, output, stats, centroids = cv2.connectedComponentsWithStats(
        im_bw, connectivity=8)

    # connectedComponentswithStats yields every seperated component with information on each of them, such as size
    # the following part is just taking out the background which is also considered a component, but most of the time we don't want that.
    sizes = stats[1:, -1]
    nb_components = nb_components - 1

    img2 = np.zeros((output.shape))
    # for every component in the image, keep it only if it's above min_size.
    # if it is above, make it black, otherwise make it just white.
    for i in range(0, nb_components):
        if sizes[i] >= min_size:
            img2[output == i + 1] = 255

    # Morphological Transform, removing unwanted small items including labels, texts, furnitures, windows, doors, etc,
    # for whose sizes are smaller than 10 px.
    kernel = np.ones((3, 3), np.uint8)
    dilation = cv2.dilate(img2, kernel, iterations=3)
    # erosion enlarges pixels
    erosion = cv2.erode(dilation, kernel, iterations=4)

    # output image here
    cv2.imwrite(output_file_path, erosion)
    cv2.waitKey()
    cv2.destroyAllWindows()


input_file_path = "grasshopper/generated floor plans/erosion.jpg"


def get_contours(input_file_path, noise_tolerance=2500):
    img_new = cv2.imread(input_file_path, cv2.IMREAD_GRAYSCALE)
    img_new = cv2.adaptiveThreshold(img_new, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                    cv2.THRESH_BINARY, 15, 2)
    contours, _ = cv2.findContours(
        ~img_new, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    mask = np.zeros_like(img_new)

    corners_threshold = 0.1

    new_contours = []
    for contour in contours:
        num_edge = (contour.shape[0])
        if num_edge < 4:
            continue

        area = cv2.contourArea(contour)
        if area > noise_tolerance:
            new_contour = []
            for c in contour:
                new_contour.append(list([int(c[0][0]), int(c[0][1])]))
            new_contours.append(new_contour)
            cv2.fillPoly(mask, [contour], 255)

    cv2.waitKey()
    cv2.destroyAllWindows()
    return new_contours
