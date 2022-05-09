import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { deleteToDo } from '../../helpers/todos'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    // TODO: Remove a TODO item by id
    const isDeleted = await deleteToDo(todoId, getUserId(event))
    if (isDeleted)
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `Deleted item with ID: ${todoId} of User ${getUserId(event)}`
            })
        }
    
    return {
        statusCode: 401,
        body: `Error while deleting todo ID: ${todoId} of User ${getUserId(event)}`
    }
    // try {
    //     const isDeleted = await deleteToDo(todoId, getUserId(event))
    //     if (isDeleted)
    //         return {
    //             statusCode: 200,
    //             body: JSON.stringify({
    //                 message: `Deleted item with ID: ${todoId} of User ${getUserId(event)}`
    //             })
    //         }
        
    //     return {
    //         statusCode: 401,
    //         body: `Error while deleting todo ID: ${todoId} of User ${getUserId(event)}`
    //     }
    // } catch (error) {   
    //     return {
    //         statusCode: 401,
    //         body: "Error while deleting todo: " + JSON.stringify(error)
    //     }
    // }
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
