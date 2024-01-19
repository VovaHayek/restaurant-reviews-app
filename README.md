# RESTAURANT VISIT DIARY APP🍽
App for writing down reviews for the restaurants someone has visited to know where to go next or to whom to recommend. This app created using Django and "Django Rest Framework" for the backend, and React for the frontend.
<br />
<br />
### Technologies and frameworks used in this app👨‍💻
<a href="https://www.djangoproject.com/" target="_blank" rel="noreferrer"> <img src="https://cdn.worldvectorlogo.com/logos/django.svg" alt="django" width="60" height="60"/></a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="60" height="60"/></a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="60" height="60"/> </a> <br />
<a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="60" height="60"/></a> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="60" height="60"/></a><br />
<a href="https://getbootstrap.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg" alt="bootstrap" width="60" height="60"/> </a>
<br />
<br />
<br />
## HOW TO RUN AN APP🏃‍♂️
### Easy Execution💻:
Simply open a .bat or a .sh file to start the app. The file will start composing a docker container.<br />
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

## API Documentation📃
To see an API Documentation, we firstly have to have an app running. After that we simply have to open any of these urls:

`http://localhost:8000/swagger/`<br />
*or*<br />
`http://localhost:8000/redoc/`
