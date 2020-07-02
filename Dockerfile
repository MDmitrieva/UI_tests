FROM node:10-alpine as builder

COPY package*.json /app/
RUN cd /app; npm ci
COPY . /app


FROM codeception/codeceptjs

COPY --from=builder /app/ /tests/

VOLUME /tests/output

CMD ["npm", "test"]
