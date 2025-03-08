import { ValidationPipe } from "@nestjs/common"
const cookieSession = require('cookie-session');

export const setup = (app)=>{
    app.use(cookieSession({
        keys : ['asdasda']
      }))
      app.useGlobalPipes(
        new ValidationPipe({
          whitelist : false
        })
      )
}