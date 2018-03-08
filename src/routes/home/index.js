import { h, Component } from "preact";

import style from "./style";

import Animated from "../../components/animated";
import { Column } from "../../components/layout";
import Masthead from "../../components/masthead";
import Section, { Markdown } from "../../components/section";
import RecruitmentForm from "../../components/forms/recruitment";
import Recruitment from "../../components/recruitment";

import Footer from "../../components/footer";

const projectsContext = require.context("./content/projects", true, /index\.js$/);
const projects = Array.from(projectsContext.keys()).map(projectsContext).map(el => el.default);

const activitiesContext = require.context("./content/activities", true, /index\.js$/);
const activities = Array.from(activitiesContext.keys()).map(activitiesContext).map(el => el.default);

//const sponsorsContext = require.context("./content/sponsors", true, /index\.js$/);
//const sponsors = Array.from(sponsorsContext.keys()).map(sponsorsContext).map(el => el.default);

import urlTeamPicture from "./content/team.jpg";
import urlAmbitionsPicture from "./content/ambitions.svg";

import textWhoWeAre from "./content/whoweare.md";
import textMission from "./content/mission.md";
//import textOurSponsors from "./content/oursponsors.md";
import textWhySupportUs from "./content/whysupportus.md";
import textJoinUs from "./content/joinus.md";

import recruitmentData from "../../recruitmentPositions.json";

const GridImages = ({ title, images }) => {
  if (!Array.isArray(images)) images = [ images ];

  return (
    <div className={style.gridEntryImages}>
      { images.map(imageUrl => <img className={style.gridEntryImage} src={imageUrl} alt={`Image about ${title}`} /> ) }
    </div>
  );
};
const GridEntry = ({ title, markdown, images }) => markdown && (
  <div className={style.gridEntry}>
    { images && <GridImages title={title} images={images} /> }
    <div className={style.gridEntryText}>
      <header className={style.gridEntryHeader}>{title}</header>
      <Markdown markdown={markdown} />
    </div>
  </div>
);

const Project = ({ title, content, image, images }) => (
  <GridEntry title={title} markdown={content} images={images || image} />
);

const Activity = ({ title, content, image, images }) => (
  <GridEntry title={title} markdown={content} images={images || image} />
);

//const Sponsor = ({ title, content, image, images }) => (
//  <GridEntry title={title} markdown={content} images={images || image} />
//);

/*
<Section name="Our sponsors">
  <Markdown markdown={textOurSponsors} />
  <div className={style.sponsors}>
    { sponsors.map(sponsor => (
      <Sponsor {...sponsor} />
    )) }
  </div>
</Section>
*/


export default class Home extends Component {
  onApplyForRole = (name) => {
    if (typeof window !== "undefined") window.location.hash = "recruitment";
    this.setState({
      applyingForRole: name
    });
  };

  onClearRole = (e) => {
    this.setState({
      applyingForRole: null
    });
  };

  render() {
    return (
      <Animated>
        <Column className={style.home}>
          <Masthead>
            <Section name="Who we are">
              <Markdown markdown={textWhoWeAre} />
              <img className={style.teamPicture} src={urlTeamPicture} alt="The team of ÆSIR" />
            </Section>
          </Masthead>
          <Section name="Our projects">
            { projects.map(project => (
              <Project {...project} />
            )) }
          </Section>
          <Section name="Our activities">
            { activities.map(activity => (
              <Activity {...activity} />
            )) }
          </Section>
          <img className={style.ambitionsPicture} src={urlAmbitionsPicture} alt="The team of ÆSIR" />
          <Section name="Our mission">
            <Markdown markdown={textMission} />
          </Section>
          <Section name="Why support us">
            <Markdown markdown={textWhySupportUs} />
          </Section>
          <Section name="Who we are looking for">
            <Recruitment applyingForRole={this.state.applyingForRole} onApplyForRole={this.onApplyForRole} specificRoles={recruitmentData.specific} genericRoles={recruitmentData.generic} />
          </Section>
          <div className="noscript-hide">
            <Section name="Join us">
              <Markdown markdown={textJoinUs} />
              <RecruitmentForm onClearRole={this.onClearRole} applyingForRole={this.state.applyingForRole} />
            </Section>
          </div>
          <Footer />
        </Column>
      </Animated>
    );
  }
}