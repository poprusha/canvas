FROM cypress/base:14

ARG USERNAME=cypress
ARG UID=1000
ARG CYPRESS_VERSION=6.4.0
ARG ZIP_PATH=/tmp/cypress.zip
ARG WORKDIR=/opt/app/

RUN userdel node && \
  adduser --uid $UID --disabled-password --gecos '' $USERNAME && \
  mkdir -p /home/$USERNAME && \
  chown -R $USERNAME /home/$USERNAME

ENV CYPRESS_CACHE_FOLDER /home/$USERNAME/.cache/$USERNAME
ENV CYPRESS_DIR $CYPRESS_CACHE_FOLDER/$CYPRESS_VERSION/

# install cypress binary
RUN curl -o $ZIP_PATH https://cdn.cypress.io/desktop/$CYPRESS_VERSION/linux-x64/cypress.zip && \
  mkdir -p $CYPRESS_DIR $CYPRESS_CACHE_FOLDER $WORKDIR && \
  unzip -d $CYPRESS_DIR $ZIP_PATH && \
  rm -f $ZIP_PATH && \
  chown -R $USERNAME $CYPRESS_DIR /home/$USERNAME/.cache $WORKDIR && \
  npx cypress verify

COPY --chown=$USERNAME docker/cypress/docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

WORKDIR $WORKDIR

USER $USERNAME

COPY --chown=$USERNAME package.json yarn.lock ./

RUN yarn

COPY --chown=$USERNAME . .

ENTRYPOINT ["docker-entrypoint"]

CMD ["yarn", "functional-tests"]
