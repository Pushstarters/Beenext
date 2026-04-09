const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-decor contact-decor--square-top" aria-hidden="true" />
      <div className="contact-decor contact-decor--diamond-bottom" aria-hidden="true" />
      <div className="contact-decor contact-decor--circle-right" aria-hidden="true" />

      <section className="contact-hero">
        <div className="contact-copy">
          <h1 className="contact-title">
            Let&apos;s build something
            <br />
            meaningful together
            <span className="contact-title-underline" aria-hidden="true">
              <svg
                width="278"
                height="14"
                viewBox="0 0 278 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 11.2631C12.5258 11.4863 30.1557 11.493 39.5046 9.57949C49.8183 7.46791 55.4153 8.55815 66.5623 6.31115C80.4281 3.51675 99.174 2.46772 105.142 1.90633C109.279 1.51696 113.383 2.01456 120.554 2.4647C134.856 3.36209 146.542 3.59189 156.294 4.38066C175.594 5.94121 190.976 5.62274 195.935 6.2995C202.005 7.12827 215.051 7.2067 224.818 7.99212C228.704 8.30465 237.628 9.2375 248.896 9.3492C254.815 9.40786 265.348 9.9141 279.341 10.0258C289.352 10.1057 297.478 10.1442 302.219 9.69056"
                  stroke="#B8444F"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="contact-subtitle">
            Got a question, idea, or opportunity in mind? We&apos;d love to hear from you.
            <br />
            Reach out and our team will get back to you shortly.
          </p>
          <a className="contact-cta" href="mailto:hello@beeglobal.vc">
            <span>Email Us</span>
            <span className="contact-cta-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;
