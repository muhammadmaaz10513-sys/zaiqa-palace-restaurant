/**
 * Email Service for sending restaurant orders to Gmail
 * Target Email: muhammadmaazramzan786@gmail.com
 */

export const RECIPIENT_EMAIL = 'muhammadmaazramzan786@gmail.com';

/**
 * Format order in clean, human-readable plain text
 */
export function formatOrderPlainText(order) {
  const itemsText = order.items
    .map((item, idx) => `  ${idx + 1}. ${item.name}\n     Quantity: ${item.quantity}  ×  Rs. ${item.price}  =  Rs. ${item.quantity * item.price}`)
    .join('\n\n');

  return `=====================================================
🍽️ NEW ORDER RECEIVED - ZAIQA PALACE & GRILL
=====================================================
Order Ref: #${order.id ? String(order.id).slice(0, 8) : 'NEW'}
Date & Time: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' })} (Pakistan Time)
Status: Pending

👤 CUSTOMER DETAILS:
-----------------------------------------------------
• Full Name: ${order.customerName}
• Phone: ${order.customerPhone}
• Delivery Address: ${order.customerAddress}
${order.notes ? `• Special Notes: ${order.notes}\n` : ''}
📦 ORDERED DISHES & QUANTITIES:
-----------------------------------------------------
${itemsText}

-----------------------------------------------------
💵 TOTAL BILL: Rs. ${order.total.toLocaleString()} PKR
-----------------------------------------------------
Delivery: Free / Standard (30-40 mins)
Payment Method: Cash on Delivery (COD)

Zaiqa Palace & Grill · Online Ordering System
=====================================================`;
}

/**
 * Creates a pre-filled Gmail Web compose link
 */
export function getGmailComposeUrl(order) {
  const subject = `🍽️ New Order: ${order.customerName} - Total: Rs. ${order.total} [Pending]`;
  const body = formatOrderPlainText(order);

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(RECIPIENT_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Sends order to Gmail using FormSubmit.co background API + direct Gmail compose
 */
export async function sendOrderToGmail(order) {
  const gmailUrl = getGmailComposeUrl(order);

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: `🍽️ New Order Received: ${order.customerName} - Rs. ${order.total} PKR (Pending)`,
        _template: 'table',
        _captcha: 'false',
        'Customer Name': order.customerName,
        'Phone Number': order.customerPhone,
        'Delivery Address': order.customerAddress,
        'Dishes & Quantities': order.itemsSummary,
        'Special Notes': order.notes || 'None',
        'Total Amount': `Rs. ${order.total} PKR`,
        'Order Status': 'Pending',
        'Order Reference': `#${String(order.id).slice(0, 8)}`,
        'Order Time': new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' }),
      }),
    });

    const result = await response.json();

    if (result.success === 'true' || result.success === true) {
      return {
        success: true,
        method: 'formsubmit',
        message: `Order sent directly to ${RECIPIENT_EMAIL}`,
        gmailUrl,
      };
    } else if (result.message && result.message.toLowerCase().includes('activation')) {
      return {
        success: false,
        needsActivation: true,
        method: 'formsubmit_needs_activation',
        message: `Activation needed: FormSubmit has sent a 1-time activation link to ${RECIPIENT_EMAIL}. Click 'Activate Form' in your inbox to enable automatic delivery.`,
        gmailUrl,
      };
    }
  } catch (err) {
    console.error('Error dispatching to FormSubmit:', err);
  }

  // Fallback to direct Gmail composer
  return {
    success: true,
    method: 'gmail_direct',
    gmailUrl,
    message: `Gmail composer prepared for ${RECIPIENT_EMAIL}`,
  };
}
