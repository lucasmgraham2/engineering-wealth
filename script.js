const form = document.getElementById("signupForm");
const emailInput = document.getElementById("email");
const submitBtn = document.getElementById("submitBtn");
const consentCheckbox = document.getElementById("consentCheckbox");
const formMessage = document.getElementById("formMessage");
const unsubscribeForm = document.getElementById("unsubscribeForm");
const unsubscribeEmailInput = document.getElementById("unsubscribeEmail");
const unsubscribeEmailConfirmInput = document.getElementById('unsubscribeEmailConfirm');
const unsubscribeBtn = document.getElementById("unsubscribeBtn");
const unsubscribeMessage = document.getElementById("unsubscribeMessage");

// Your Google Apps Script Web App URL.
// Replace this with the URL Google gives you after deployment.
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzOLOnPtMt7znvfoZnFnD8GhTL3yLrAehNY90pEvrboZbd3sOsB4jFEFKVI38pRA5_I/exec";

function setMessage(target, text, state = "") {
  if (!target) {
    return;
  }

  target.textContent = text;

  target.classList.remove("success", "error");

  if (state) {
    target.classList.add(state);
  }
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim().toLowerCase();

    // Basic validation
    if (!email) {
      setMessage(formMessage, "Enter your email address.", "error");
      return;
    }

    // More complete email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setMessage(formMessage, "Please enter a valid email address.", "error");
      return;
    }

    if (!consentCheckbox || !consentCheckbox.checked) {
      setMessage(
        formMessage,
        "Please confirm the consent checkbox before signing up.",
        "error",
      );
      return;
    }

    submitBtn.disabled = true;
    setMessage(formMessage, "Signing you up...");

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",

        body: JSON.stringify({
          email: email,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setMessage(
          formMessage,
          "You are signed up! Check your inbox.",
          "success",
        );

        form.reset();
      } else {
        setMessage(
          formMessage,
          result.error || "Signup failed. Please try again.",
          "error",
        );
      }
    } catch (error) {
      console.error("Signup error:", error);

      setMessage(
        formMessage,
        "Something went wrong. Please try again later.",
        "error",
      );
    } finally {
      submitBtn.disabled = false;
    }
  });
}

if (unsubscribeForm) {
  unsubscribeForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = unsubscribeEmailInput.value.trim().toLowerCase();
    const confirmEmail = unsubscribeEmailConfirmInput.value.trim().toLowerCase();

    if (!email) {
      setMessage(
        unsubscribeMessage,
        'Enter your email address.',
        'error'
      );
      return;
    }

    if (!confirmEmail) {
      setMessage(
        unsubscribeMessage,
        'Please confirm your email address.',
        'error'
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setMessage(
        unsubscribeMessage,
        'Please enter a valid email address.',
        'error'
      );
      return;
    }

    if (!emailRegex.test(confirmEmail)) {
      setMessage(
        unsubscribeMessage,
        'Please enter a valid email address.',
        'error'
      );
      return;
    }

    if (email !== confirmEmail) {
      setMessage(
        unsubscribeMessage,
        'The email addresses do not match.',
        'error'
      );
      return;
    }

    unsubscribeBtn.disabled = true;

    setMessage(
      unsubscribeMessage,
      'Unsubscribing...'
    );

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({
          action: 'unsubscribe',
          email: email
        })
      });

      const result = await response.json();

      if (result.success) {
        setMessage(
          unsubscribeMessage,
          result.message || 'You have been successfully unsubscribed.',
          'success'
        );

        unsubscribeForm.reset();

      } else {
        setMessage(
          unsubscribeMessage,
          result.error || 'Unable to unsubscribe.',
          'error'
        );
      }

    } catch (error) {
      console.error('Unsubscribe error:', error);

      setMessage(
        unsubscribeMessage,
        'Something went wrong. Please try again later.',
        'error'
      );

    } finally {
      unsubscribeBtn.disabled = false;
    }
  });
}