export default function contact() {
  return (
    <form
      name="contact"
      method="POST"
      data-netlify-recaptcha="true"
      action="/index"
      netlify-honeypot="bot-field"
      data-netlify="true"
    >
      <p style={{ display: "none" }}>
        <label>
          Don’t fill this out if you’re human: <input name="bot-field" />
        </label>
      </p>
      <p>
        <label>
          Name: <input type="text" name="name" />
        </label>
      </p>
      <p>
        <label>
          Email: <input type="email" name="email" />
        </label>
      </p>
      <p>
        <label>
          Message: <textarea name="message"></textarea>
        </label>
      </p>
      <div data-netlify-recaptcha="true"></div>
      <p>
        <button type="submit">Send</button>
      </p>
    </form>
  );
}
