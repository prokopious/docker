import express, { Application, Request, Response } from "express"
const stripe = require("stripe")(
  "sk_test_51HfxkwLI0RKXakgYsf8TccSDaUkqNmnPh75wzx7qQxLXRGtUIGTMiZfttYHsQ4mlOwskzEbKsFF9aZ4LsGbpfVPE00YBWvYnD0"
)
const app: Application = express()
const port: number = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: "This back-end is powered by Stripe, Docker, TypeScript, and AWS!",
  })
})

const YOUR_DOMAIN: string = "http://localhost:4000"

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1IOXwhLI0RKXakgY1KlLggrz",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
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
