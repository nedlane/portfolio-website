// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ message: "Invalid input. Please check your details." });
  }
  if (!validateBody(body)) {
    return res.status(400).json({ message: "Invalid input. Please check your details." });
  }
  if (!process.env.RECAPTCHA_SECRET_KEY || !process.env.DISCORD_WEBHOOK_URL) {
    return res.status(503).json({ message: "The form is unavailable. Please email me directly." });
  }
  try {
    const { statusCode, obj } = await validateToken(body.token);
    if (statusCode === 200) await discordMessage(body.data);
    return res.status(statusCode).json(obj);
  } catch {
    return res.status(502).json({ message: "Your message could not be delivered. Please email me directly." });
  }
};

async function discordMessage(data) {
  const webhookURL = process?.env?.DISCORD_WEBHOOK_URL;
  const sendobject = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: "@everyone",
      embeds: [
        {
          title: `New website request from ${data.name}`,
          color: 0,
          description: `${data.email}\n${data.message}`,
        },
      ],
    }),
  };
  const response = await fetch(webhookURL, sendobject);
  if (!response.ok) throw new Error("Message delivery failed");
  return;
}

async function validateToken(token) {
  const secretKey = process?.env?.RECAPTCHA_SECRET_KEY;
  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      body: `secret=${secretKey}&response=${token}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
    },
  );
  const validity = await response.json();
  if (validity.success) {
    if (validity.score >= 0.5) {
      return {
        statusCode: 200,
        obj: { message: "Your message has been forwarded! Thank you!" },
      };
    } else {
      return {
        statusCode: 401,
        obj: {
          message:
            "ReCAPTCHA verification shows suspicious activity, please try again later. (401 Unauthorized)",
        },
      };
    }
  } else {
    return {
      statusCode: 401,
      obj: {
        message:
          "ReCAPTCHA verification failed. Please try again later. (401 Unauthorized)",
      },
    };
  }
}

function validateBody(input) {
  if (typeof input !== "object" || input === null) {
    return false;
  }

  if (
    !input.hasOwnProperty("data") ||
    typeof input.data !== "object" ||
    input.data === null
  ) {
    return false;
  }

  if (
    typeof input.data.name !== "string" ||
    typeof input.data.email !== "string" ||
    !isValidFullName(input.data.name) ||
    !isValidEmail(input.data.email) ||
    typeof input.data.message !== "string"
  ) {
    return false;
  }

  if (
    input.data.name.length < 3 ||
    input.data.email.length < 5 ||
    input.data.message.length < 10
  ) {
    return false;
  }

  if (
    input.data.name.length > 100 ||
    input.data.email.length > 200 ||
    input.data.message.length > 1500
  ) {
    return false;
  }

  if (!input.hasOwnProperty("token") || typeof input.token !== "string") {
    return false;
  }

  return true;
}

function isValidFullName(name) {
  const nameRegex = /^[a-zA-Z\s\-,.']+$/;
  return nameRegex.test(name);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
