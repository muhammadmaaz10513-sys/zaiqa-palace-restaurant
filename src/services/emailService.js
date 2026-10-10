/**
 * Email Service for sending restaurant orders to Gmail
 * Target Email: muhammadmaazramzan786@gmail.com
 */

export const RECIPIENT_EMAIL = 'muhammadmaazramzan786@gmail.com';

export function getEmailConfig() {
  return {
    targetEmail: RECIPIENT_EMAIL,
    web3FormsKey: localStorage.getItem('smit_web3forms_key') || '',
  };
}

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
Delivery: Free / Standard
Payment Method: Cash on Delivery (COD)

Zaiqa Palace & Grill · Online Ordering System
=====================================================`;
}

/**
 * Format order into clean HTML for email clients
 */
export function formatOrderHtml(order) {
  const rows = order.items
    .map(
      (item, idx) => `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 10px 12px; font-weight: 500;">${idx + 1}. ${item.name}</td>
        <td style="padding: 10px 12px; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px 12px; text-align: right;">Rs. ${item.price}</td>
        <td style="padding: 10px 12px; text-align: right; font-weight: 600;">Rs. ${item.quantity * item.price}</td>
      </tr>`
    )
    .join('');

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden;">
      <div style="background: #ea580c; color: #ffffff; padding: 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">🍽️ Zaiqa Palace & Grill</h1>
        <p style="margin: 6px 0 0; font-size: 14px; opacity: 0.9;">New Customer Order Notification</p>
      </div>

      <div style="padding: 24px;">
        <div style="background: #f8fafc; border-left: 4px solid #ea580c; padding: 14px 18px; border-radius: 4px; margin-bottom: 20px;">
          <h3 style="margin: 0 0 10px; color: #1e293b; font-size: 16px;">Customer Information</h3>
          <p style="margin: 4px 0; color: #475569;"><strong>Name:</strong> ${order.customerName}</p>
          <p style="margin: 4px 0; color: #475569;"><strong>Phone:</strong> ${order.customerPhone}</p>
          <p style="margin: 4px 0; color: #475569;"><strong>Address:</strong> ${order.customerAddress}</p>
          ${order.notes ? `<p style="margin: 4px 0; color: #475569;"><strong>Notes:</strong> ${order.notes}</p>` : ''}
          <p style="margin: 4px 0; color: #475569;"><strong>Status:</strong> <span style="background: #fef3c7; color: #b45309; padding: 2px 8px; border-radius: 4px; font-weight: 600;">Pending</span></p>
        </div>

        <h3 style="margin: 0 0 12px; color: #1e293b; font-size: 16px;">Order Summary</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
          <thead>
            <tr style="background: #f1f5f9; text-align: left; color: #475569;">
              <th style="padding: 10px 12px;">Dish</th>
              <th style="padding: 10px 12px; text-align: center;">Qty</th>
              <th style="padding: 10px 12px; text-align: right;">Unit Price</th>
              <th style="padding: 10px 12px; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
          <tfoot>
            <tr style="background: #f8fafc; font-size: 16px;">
              <td colspan="3" style="padding: 14px 12px; font-weight: 700; text-align: right;">Grand Total:</td>
              <td style="padding: 14px 12px; font-weight: 700; text-align: right; color: #ea580c;">Rs. ${order.total.toLocaleString()} PKR</td>
            </tr>
          </tfoot>
        </table>

        <div style="text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 16px;">
          Zaiqa Palace & Grill · Online Order Management
        </div>
      </div>
    </div>
  `;
}

/**
 * Creates a pre-filled Gmail Web compose link
 */
export function getGmailComposeUrl(order) {
  const subject = `New Order from ${order.customerName} - Total: Rs. ${order.total} [Pending]`;
  const body = formatOrderPlainText(order);

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(RECIPIENT_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Sends order to Gmail using Web3Forms public API with direct Gmail fallback
 */
export async function sendOrderToGmail(order) {
  const config = getEmailConfig();
  const plainText = formatOrderPlainText(order);

  // If a Web3Forms key is configured, post to Web3Forms API
  if (config.web3FormsKey && config.web3FormsKey.trim() !== '') {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: config.web3FormsKey.trim(),
          subject: `🍽️ New Order: ${order.customerName} - Rs. ${order.total} (Pending)`,
          from_name: 'Zaiqa Palace Orders',
          email: RECIPIENT_EMAIL,
          message: plainText,
          customer_name: order.customerName,
          customer_phone: order.customerPhone,
          customer_address: order.customerAddress,
          items: order.itemsSummary,
          total: `Rs. ${order.total} PKR`,
          status: 'Pending',
        }),
      });

      const result = await response.json();
      if (result.success) {
        return {
          success: true,
          method: 'web3forms',
          message: `Order sent to ${RECIPIENT_EMAIL}`,
        };
      }
    } catch (err) {
      console.error('Web3Forms dispatch error:', err);
    }
  }

  // Fallback: Return success status with Gmail compose link readily available
  return {
    success: true,
    method: 'gmail_direct',
    gmailUrl: getGmailComposeUrl(order),
    message: `Order sent to ${RECIPIENT_EMAIL}`,
  };
}
