// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  const body = JSON.parse(req.body);
  if (!validateBody(body)) {
    res.status(400).send({
      message:
        "Invalid input, please review and correct your information. (400 Bad Request)",
    });
  }
  const { statusCode, obj } = await validateToken(body.token);
  if (statusCode == 200) {
    discordMessage(body.data);
  }
  res.status(statusCode).json(obj);
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
  await fetch(webhookURL, sendobject);
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
