FROM python:3.11.4
EXPOSE 8000
ENV PYTHONUNBUFFERED=1

WORKDIR /code

COPY requirements.txt /code

RUN pip install -r requirements.txt

COPY . /code

RUN python manage.py test

CMD ["python","manage.py","runserver", "0.0.0.0:8000"]