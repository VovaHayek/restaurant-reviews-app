# RESTAURANT VISIT DIARY APP🍽
App for writing down reviews for the restaurants someone has visited to know where to go next or to whom to recommend
<br />
<br />
<br />
## HOW TO RUN AN APP🏃‍♂️
### Easy Execution💻:
Simply open the .bat file to start the app. The file will start a virtual environment, and start composing a docker container.<br />
**_The Docker SHOULD BE OPEN!!!_**
<br />
<br />
### Manual Execution✍:
If .bat file is damaged or not working we can always start an app via the *CMD*! First of all we have to open a terminal inside of a ifrst main folder. Then we should use this command to launch a virtual environment.

```
app-env\Scripts\activate.bat
```

After we did that, we should head to the _reviews_ folder. To do this simply just use this command.

```
cd reviews
```

And when we're in this folder, we have to use following command to compose a docker container *(Docker should be OPEN!!!)*

```
docker compose up --build
```
