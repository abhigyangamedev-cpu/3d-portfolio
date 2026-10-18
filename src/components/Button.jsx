/**
 * A reusable CTA button component.
 * When clicked, it scrolls smoothly to the section matching the given id,
 * with a small offset from the top for better visual placement.
 * If an href is passed in, it opens that external link in a new tab instead.
 */

const Button = ({ text, className, id, href }) => {
  return (
    <a
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      onClick={(e) => {
        if (href) return; // Let external links open normally

        e.preventDefault(); // Stop the link from jumping instantly

        const target = document.getElementById(id); // Find the section matching the passed-in ID

        // Only scroll if we found the section and an ID is passed in
        // taht prevents the contact button from scrolling to the top
        if (target && id) {
          const offset = window.innerHeight * 0.15; // Leave a bit of space at the top

          // Calculate how far down the page we need to scroll
          const top =
            target.getBoundingClientRect().top + window.pageYOffset - offset;

          // Scroll smoothly to that position
          window.scrollTo({ top, behavior: "smooth" });
        }
      }}
      className={`${className ?? ""} cta-wrapper`} // Add base + extra class names
    >
      <div className="cta-button group">
        <div className="bg-circle" />
        <p className="text">{text}</p>
        <div className="arrow-wrapper">
          <img src="/images/arrow-down.svg" alt="arrow" />
        </div>
      </div>
    </a>
  );
};

export default Button;
