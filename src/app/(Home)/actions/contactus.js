"use server";
import Contact from "./$contact";
const nodemailerMailgun = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export default async function contactus(props) {
  try {
    const { name, email, message, phone } = props;
    const validation = Contact.safeParse({ name, email, message, phone });
    if (!validation.success) {
      return {
        data: null,
        errors: validation.error.flatten().fieldErrors,
      };
    }
    const emailText = `
        Hola ${name},

        ¡Gracias por contactarnos!

        Hemos recibido tu mensaje y queremos agradecerte por escribirnos. Aquí están los detalles que nos enviaste:
        - Email: ${email}
        - Teléfono: ${phone}
        - Mensaje: ${message}

        Nos pondremos en contacto contigo lo antes posible. Mientras tanto, puedes visitar nuestro sitio web en www.sterlingplasma.com para más información.

        ¡Gracias por tu interés en nuestros servicios!

        Saludos,
        El equipo de Sterling Plasma
        `;
    await nodemailerMailgun.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      cc: process.env.EMAIL_FROM,
      subject: `Hola ${name}, gracias por contactarnos`,
      html: `<!DOCTYPE html>
              <html>
              <head>
                  <meta charset="UTF-8">
                  <title>Mensaje recibido</title>
                  <style>
                      body {
                          font-family: Arial, sans-serif;
                          color: #ffffff;
                          background-color: rgb(15, 23, 42);
                          padding: 20px;
                      }

                      a {
                          color: #f1c40f;
                      }

                      ul {
                          list-style-type: none;
                      }

                      li {
                          margin: 5px 0;
                      }

                      p {
                          line-height: 1.5;
                      }

                      .logo {
                          height: 40px;
                          width: 40px;
                      }
                  </style>
              </head>
              <body>
                  <img src="https://stgfinal.s3.amazonaws.com/plasma/landing2024/SterlingPlasmablue.svg" alt="Sterling Plasma Logo" class="logo" onerror="this.onerror=null; this.src='data:image/svg+xml,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'><rect width=\'40\' height=\'40\' fill=\'rgb(15, 23, 42)\'/><text x=\'50%\' y=\'50%\' font-size=\'5\' fill=\'#ffffff\' text-anchor=\'middle\' dominant-baseline=\'middle\'>Logo</text></svg>'">
                  <p>Hola ${name},</p>
                  <p>¡Gracias por contactarnos!</p>
                  <p>Hemos recibido tu mensaje y queremos agradecerte por escribirnos. Aquí están los detalles que nos enviaste:</p>
                  <ul>
                      <li>Email: ${email}</li>
                      <li>Teléfono: ${phone}</li>
                      <li>Mensaje: ${message}</li>
                  </ul>
                  <p>Nos pondremos en contacto contigo lo antes posible. Mientras tanto, puedes visitar nuestro sitio web en <a href="https://www.sterlingplasma.com">www.sterlingplasma.com</a> para más información.</p>
                  <p>¡Gracias por tu interés en nuestros servicios!</p>
                  <p>Saludos,</p>
                  <p>El equipo de Sterling Plasma</p>
              </body>
              </html>
              `,
      text: emailText,
    });
  } catch (error) {
    return {
      errors: {
        general: error.abort ?? error.message,
      },
    };
  }
  return { data: null };
}
