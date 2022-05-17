export const AppFooter = () => {
  return (
    <footer className="footer">
      {/* <!-- first column --> */}
      <div className="footer-columns">
        <h4 className="footer-heading">Ampere Doc</h4>
        <small className="footer-subheading">
          Made with ReactJs and AmpereUI
        </small>
        <a
          className="footer-link"
          href="https://github.com/FarhanMobashir/ampere-shop-react"
        >
          Source code
        </a>
      </div>
      {/* <!-- second column --> */}
      <div className="footer-columns">
        <h4 className="footer-heading">Made by</h4>
        <small className="footer-subheading">
          Mobashir Farhan. Feel free to connect and share your feedback
        </small>
        <a className="footer-link" href="https://github.com/FarhanMobashir">
          Github
        </a>
        <a
          className="footer-link"
          href="https://mobile.twitter.com/MobashirFarhan"
        >
          Twitter
        </a>
        <a
          className="footer-link"
          href="https://www.linkedin.com/in/mobashirfarhan/"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
};
