import express, { Application, Request, Response } from "express"
const stripe = require("stripe")(
  "sk_test_51HfxkwLI0RKXakgYsf8TccSDaUkqNmnPh75wzx7qQxLXRGtUIGTMiZfttYHsQ4mlOwskzEbKsFF9aZ4LsGbpfVPE00YBWvYnD0"
)
const path = require("path")

const app: Application = express()
const port: number = 3000
app.use(express.static(path.join(__dirname, "..", "build")))
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", async (req: Request, res: Response): Promise<any> => {
  res.status(200).sendFile(path.join(__dirname, "..", "build", "index.html"))
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
