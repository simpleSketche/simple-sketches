# READ THIS

Follow the steps below to have the script to work on your computer:


1. The folder structure:
__app
    |____pycache__
    |___grasshopper
    |___venv
    |___app.py
    |___vectorize_floor_plan.py
These are the important folders and files to look at. Ignore _pycache_ and venv, you don't need to learn these two to run the model.

2. After reviewing the folder structure and how files are stored, let's look at the first folder - grasshopper. In this folder, you will find the rhino file and grasshpper file in the **GH files** folder. You will also find all the examples floor plan images I used in the folder **floor plans**. Keep other folders there, don't delete / move other folders.
3. Back to the **app** parent folder, you will find two python files. **app.py** and **vectorize_floor_plan.py**. Basically, app.py runs the backend calculations that convert the floor plan image into coordinates and send the result to the Grasshopper file. And vectorize_floor_plan.py contains the calculations.


Now, let's get into how to run this.

1. Click on your folder path ![image](https://user-images.githubusercontent.com/71196100/150719736-690fb462-a5b3-432c-ac3d-ec5bc381faf0.png)
2. Type CMD and hit enter key ![image](https://user-images.githubusercontent.com/71196100/150719785-5ab1973e-9fe6-49a3-b9dc-784c5179ec5c.png)
3. In your CMD, type **.\venv\Scripts\activate** and hit enter. Right after that, type **python app.py** and hit enter to run the backend localhost.
4. You should see this once you successfully initialize the localhost from your CMD ![image](https://user-images.githubusercontent.com/71196100/150719984-c432b09b-8791-441b-b0ec-3d1a26c8f386.png)
5. Now open the app.py file in your code editr (such as VSCode). 
6. Now, in the app.py, find line 20 where you have to enter a local path where you store the floor plan images, it could be the existing sample folder that I made to store the example floor plan images, or you can customize one folder path for your own use ![image](https://user-images.githubusercontent.com/71196100/150720101-3bf12806-1454-4b7e-9332-8746bba1da70.png)
7. Once you enter the path, save the file. 
8. Open the rhino and grasshopper file. These two files You can find at the grasshopper folder.
9. Once both rhino and grasshopper files are opened, right click on grasshopper canvas and hit recompute.
10. You then should see the results on your rhino screen. 
11. Enjoy, have fun! Leave comments if you find difficulty to follow the steps, let me know!



