import express, { Application, Request, Response } from "express"
const stripe = require("stripe")(
  "sk_test_51HfxkwLI0RKXakgYsf8TccSDaUkqNmnPh75wzx7qQxLXRGtUIGTMiZfttYHsQ4mlOwskzEbKsFF9aZ4LsGbpfVPE00YBWvYnD0"
)
const path = require("path")

const app: Application = express()
const port: number = 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", async (req: Request, res: Response): Promise<any> => {
  res.status(200).send(`<!DOCTYPE html>
  <html>
    <head>
      <style>
          html {
              background-color: rgb(210, 215, 240);
          }
        p {
          font-family: Helvetica;
        }
        #code {
          font-family: courier;
          background-color: rgb(226, 108, 108);
        }
        .centered {
          position: fixed;
          top: 50%;
          left: 50%;
          width: 90%;
          max-width: 900px;
          transform: translate(-50%, -50%);
        }
      </style>
    </head>
    <body>
      <div>
        <div class="centered">
          <p>
            This backend is powered by Stripe, Ubuntu, AWS EC2, Docker, Nginx,
            Typescript, and NodeJS. It redirects customers to the checkout page for <a href="https://suspicious-jepsen-411cb1.netlify.app/"
            >this product</a
          > by means of a hard-coded
            <span id="code">.post()</span> endpoint. The code can be found <a href="https://github.com/prokopious/docker">here</a>.
          </p>
        </div>
      </div>
    </body>
  </html>
  `)
})

const YOUR_DOMAIN: string = "https://suspicious-jepsen-411cb1.netlify.app/"

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: "price_1IOXwhLI0RKXakgY1KlLggrz",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}`,
  })

  res.redirect(303, session.url)
})

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`)
  })
} catch (error) {
  console.error(`Error occured`)
}
