import axios from "axios";
import Event from "../models/Event.js";
import Order from "../models/Order.js";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

// ===============================
// INITIALIZE PAYMENT
// ===============================
export const initializePayment = async (req, res) => {
  try {
    const { eventId, ticketType, quantity, email } = req.body;

    const event = await Event.findOne({ eventId });
    if (!event)
      return res.status(404).json({ message: "Event not found" });

    const selectedPrice = event.details.prices.find(
      p => p.type === ticketType
    );

    if (!selectedPrice)
      return res.status(400).json({ message: "Invalid ticket type" });

    const amount = selectedPrice.amount * quantity;
    const reference = "EVT_" + Date.now();

    await Order.create({
      reference,
      eventId,
      email,
      ticketType,
      quantity,
      amount,
      status: "pending"
    });

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100,
        reference,
        callback_url: `${process.env.BASE_URL}/api/payments/verify/${reference}`
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({
      success: true,
      authorization_url: response.data.data.authorization_url
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// VERIFY PAYMENT
// ===============================
export const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.params;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`
        }
      }
    );

    const data = response.data.data;

    if (data.status !== "success") {
      return res.status(400).json({ message: "Payment not successful" });
    }

    const order = await Order.findOne({ reference });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === "paid") {
      return res.json({ message: "Payment already verified" });
    }

    // Update order status
    order.status = "paid";
    await order.save();

    // Increment peopleGoing
    await Event.updateOne(
      { eventId: order.eventId },
      { $inc: { "card.peopleGoing": order.quantity } }
    );

    // You can generate ticket here if needed

    res.redirect(`${process.env.FRONTEND_URL}/success.html`);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};