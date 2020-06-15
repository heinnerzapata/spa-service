import SignIn from "pages/signin";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";

export default withTranslation("translation")(withRouter(SignIn));
