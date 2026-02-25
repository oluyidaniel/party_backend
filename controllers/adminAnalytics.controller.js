import Order from "../models/Order.js";
import Event from "../models/Event.js";

// ==============================
// ADMIN ANALYTICS
// ==============================
export const getAdminAnalytics = async (req, res) => {
  try {
    // Get all events
    const events = await Event.find();

    // Prepare analytics per event
    const analytics = await Promise.all(
      events.map(async (event) => {
        // Get all orders for this event
        const orders = await Order.find({ eventId: event.eventId });

        const totalRevenue = orders
          .filter(o => o.status === "paid")
          .reduce((sum, o) => sum + o.amount, 0);

        const totalTicketsSold = orders
          .filter(o => o.status === "paid")
          .reduce((sum, o) => sum + o.quantity, 0);

        const paymentStatuses = orders.map(o => ({
          email: o.email,
          ticketType: o.ticketType,
          quantity: o.quantity,
          amount: o.amount,
          status: o.status,
          reference: o.reference
        }));

        return {
          eventId: event.eventId,
          title: event.card.title,
          totalRevenue,
          totalTicketsSold,
          orders: paymentStatuses
        };
      })
    );

    res.json({ success: true, analytics });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};