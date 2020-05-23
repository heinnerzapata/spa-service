import React, { Component } from "react";
import PageTitle from "../../uiComponents/pageTitle/PageTitle";
import Session from "../../uiComponents/containers/session/Session";
import PageContainer from "../../uiComponents/pageContainer/PageContainer";
import { withTranslation } from "react-i18next";
import { V7CardLinkImage } from "uiComponents/components";
import Masonry from "react-masonry-css";
import "./Dashboard.scss";
import cardBackground1 from "../../static/media/images/mtto1/img01.jpg";
import cardBackground2 from "../../static/media/images/mtto1/img02.jpg";
import cardBackground3 from "../../static/media/images/mtto1/img03.jpg";
import cardBackground4 from "../../static/media/images/mtto1/img04.jpg";

class Dasboard extends Component {
  render() {
    const { t } = this.props;
    return (
      <Session next={"dashboard"}>
        <div className="vol7er-dashboard">
          <PageTitle title={t("pages.dashboard.title")} />
          <PageContainer
            isMarginTopActivated={false}
            showTools={true}
            isFull={true}
          >
            <Masonry
              breakpointCols={{ default: 5, 800: 1, 1024: 2, 1300: 3, 1750: 4, 2000: 5 }}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              <V7CardLinkImage
                title="GPS"
                url="/machines"
                minHeight={600}
                background={cardBackground1}
              />

              <V7CardLinkImage
                title="Plan Mantenimiento"
                url="/machines"
                minHeight={200}
                background={cardBackground2}
              />

              <V7CardLinkImage
                title="Informes"
                url="/machines"
                minHeight={300}
                background={cardBackground3}
              />

               <V7CardLinkImage
                title="Alertas"
                url="/machines"
                minHeight={600}
                background={cardBackground4}
              />
            </Masonry>
          </PageContainer>
        </div>
      </Session>
    );
  }
}

export default withTranslation("common")(Dasboard);
