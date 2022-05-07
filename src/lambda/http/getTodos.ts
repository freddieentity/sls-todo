import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

// import { getTodosForUser as getTodosForUser } from '../../helper/todos'
import { getToDos } from '../../helpers/todos'
// import { getUserId } from '../utils';

// TODO: Get all TODO items for a current user
export const handler = 
  middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Processing event: ', event)
  
    const items = await getToDos();

    return {
      statusCode: 200,
      body: JSON.stringify({
        items
      })
    }
  })

handler.use(
  cors({
    credentials: true
  })
)
