FROM nikolaik/python-nodejs:python3.7-nodejs10

ENV PYTHONUNBUFFERED 1
RUN mkdir -p /opt/services/leadmanager/src

COPY Pipfile Pipfile.lock /opt/services/leadmanager/src/
WORKDIR /opt/services/leadmanager/src
RUN pip install pipenv && pipenv install --system

COPY . /opt/services/leadmanager/src
RUN npm run build
RUN cd leadmanager && python manage.py collectstatic --no-input

EXPOSE 8000
CMD ["gunicorn", "-c", "config/gunicorn/conf.py", "--bind", ":8000", "--chdir", "leadmanager", "leadmanager.wsgi:application"]
