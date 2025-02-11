# Use an official Python runtime as a parent image
FROM python:3.10.7-slim-bullseye

# System setup
RUN apt-get update \
  && apt-get dist-upgrade -y \
  && apt-get install -y --no-install-recommends \
    git \
    # ssh-client \
    # software-properties-common \
    # make \
    # build-essential \
    # ca-certificates \
    # libpq-dev \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*



# Set the working directory in the container to /app
WORKDIR /backend

# Add the current directory contents into the container at /app
# ADD . /backend

# Update python
RUN python -m pip install --upgrade pip setuptools wheel --no-cache-dir

# Add shortcut to user runserver on the correct host
RUN echo 'alias runserver="python manage.py runserver 0.0.0.0:8000"' >> ~/.bashrc

# Install any needed packages specified in requirements.txt
# RUN pip install --no-cache-dir virtualenv && \
# source venv/bin/activate && \
# pip install --no-cache-dir -r requirements.txt

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run app.py when the container launches
# CMD ["python", "app.py"]