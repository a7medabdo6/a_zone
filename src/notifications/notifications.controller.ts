import { Controller, Get, Res, Sse } from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface MessageEvent {
  data: any;
}
@Controller('notifications')
export class NotificationsController {
  // Endpoint to handle SSE connections
  //   @Get()
  //   getSse(@Res() res: Response) {
  //     // Set headers for SSE
  //     res.setHeader('Content-Type', 'text/event-stream');
  //     res.setHeader('Cache-Control', 'no-cache');
  //     res.setHeader('Connection', 'keep-alive');
  //     res.flushHeaders(); // Flush headers immediately to start the stream

  //     // Sending the first event immediately
  //     res.write('data: Hello from the server!\n\n');

  //     // Simulate sending an event after 5 seconds
  //     setTimeout(() => {
  //       res.write('data: Custom event after 5 seconds\n\n');
  //     }, 5000);

  //     // Simulate sending an error event after 10 seconds
  //     setTimeout(() => {
  //       res.write('event: error\ndata: Something went wrong!\n\n');
  //     }, 10000);
  //   }

  // Another endpoint that can be used for testing
  @Sse()
  streamNotifications(): Observable<any> {
    return new Observable((observer) => {
      // Send a message every 5 seconds
      setInterval(() => {
        observer.next({
          data: `Event from server at ${new Date().toISOString()}`,
        });
      }, 5000);
    }).pipe(map((event) => event));
  }
}
