```
$ npm i
```

### バックエンド(socket.io)の起動

```
$ docker-compose -f ./packages/server/docker-compose.yml up -d
$ npm run prisma:migrate dev -w packages/server
$ npm run dev -w packages/server
```

### フロントエンド(Next.js)の起動

```
$ npm run dev -w packages/web
```
