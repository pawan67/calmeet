// emailTemplate.ts

type Booking = {
  eventId: string;
  startTime: Date;
  userId: string;
  note: string;
  timeZone: string;
};
interface User {
  firstName: string;
  lastName?: string;
  emailAddresses: { emailAddress: string }[];
}

interface EventType {
  title: string;
}

export const generateHTML = (
  hostUser: User,
  attendeeUser: User,
  eventType: EventType,
  booking: Booking,
  date: Date,
  link: string,
  bookingLink: string
): string => {
  return `
  <html>
  <head>
    <title>Booking Confirmation</title>
    <style>
      /* Add custom CSS styles here */
      body {
        background-color: #f3f4f6;
        font-family: Arial, sans-serif;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .text-lg {
        font-size: 1.25rem;
        font-weight: bold;
        color: #333333;
      }
      .image-logo {
        max-width: 100px;
        display: block;
        margin: 0 auto;
      }
      /* Add more custom styles as needed */
    </style>
  </head>
  <body>
    <div class="container">
    <img src="https://i.imgur.com/W5YEdcK.png" class="image-logo" alt="">

      <p class="text-lg">Hi ${hostUser.firstName},</p>
      <p>${attendeeUser.firstName} has booked an event with you.</p>
      <p>Event: ${eventType.title}</p>
      <p>Start time: ${date}</p>
      <p>Note: ${booking.note || ""}</p>
      <p>Attendee: ${attendeeUser.firstName} ${attendeeUser.lastName || ""}</p>
      <p>Attendee Email: ${attendeeUser.emailAddresses[0].emailAddress}</p>
      <p>Timezone: ${booking.timeZone}</p>
      <p>Link for the meeting: p> <a href="${link}">${link}</a></p>
      <p>Booking: p> <a href="${bookingLink}">${bookingLink}</a></p>

      <p>Best regards,</p>
      <p>Calmeet</p>
    </div>
  </body>
</html>
    `;
};

export const generateHTMLForAttendee = (
  hostUser: User,
  attendeeUser: User,
  eventType: EventType,
  booking: Booking,
  date: Date,
  link: string,
  bookingLink: string
): string => {
  return `
    <html>
    <head>
      <title>Booking Confirmation</title>
      <style>
        /* Add custom CSS styles here */
        body {
          background-color: #f3f4f6;
          font-family: Arial, sans-serif;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .text-lg {
          font-size: 1.25rem;
          font-weight: bold;
          color: #333333;
        }
        /* Add more custom styles as needed */
        .image-logo {
          max-width: 100px;
          display: block;
          margin: 0 auto;
        }
      </style>
    </head>
    <body>
      <div class="container">
      <img src="https://i.imgur.com/W5YEdcK.png" class="image-logo" alt="">
      <p class="text-lg">Hi ${attendeeUser.firstName},</p>
        <p>You have succesfully  booked an event with ${hostUser.firstName}.</p>
        <p>Event: ${eventType.title}</p>
        <p>Start time: ${date}</p>
        <p>Note: ${booking.note || ""}</p>
       
        <p>Your Email: ${attendeeUser.emailAddresses[0].emailAddress}</p>
        <p>Host Email: ${hostUser.emailAddresses[0].emailAddress}</p>
        <p>Timezone: ${booking.timeZone}</p>
        <p>Link for the meeting:  <a href="${link}">${link}</a></p>
        <p>Booking: p> <a href="${bookingLink}">${bookingLink}</a></p>

        

        <p>Best regards,</p>
        <p>Calmeet</p>
      </div>
    </body>
  </html>
      `;
};
