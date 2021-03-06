import { h, Component } from "preact";
import Field from "../field";
import Button from "../button";
import Radio from "../radio";

import style from "./style.scss";

const KTHMailRegexPattern = "[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@(?:[a-zA-Z0-9-]+\\.)*(?:kth\\.se)";

const LevelOfStudyChoices = [
  "bachelor",
  "civil engineer",
  "master",
  "other"
];

export default class RecruitmentForm extends Component {
  render({ applyingForRole, onClearRole }) {
    return (
      <form id="recruitment" method="post" className={style.recruitmentForm}>
        <input type="hidden" name="form-name" value="contact" />
        <input type="hidden" name="applying for" value={applyingForRole} />
        <div hidden className={style.hidden}>
          <label>resistance is futile: <input name="very-pot" /></label>
        </div>
        <div className={style.container}>
          <div className={style.row}>
            <div className={style.flex}>
              <Field lines="single" type="text" name="name">Your name</Field>
            </div>
            <div className={style.flex}>
              <Field lines="single" type="email" name="email" pattern={KTHMailRegexPattern}>Your KTH email</Field>
            </div>
          </div>
          {
            applyingForRole && (
              <div className={style.row}>
                <div className={style.flex}>
                  <Field lines="single" value={applyingForRole} disabled type="text">Applying for role</Field>
                </div>
                <div className={style.button}>
                  <Button onClick={onClearRole} type="button">Clear role</Button>
                </div>
              </div>
            )
          }
          <div className={style.row}>
            <div className={style.flex}>
              <Field lines="multiple" type="text" name="describe yourself">Describe what you could help out with at ÆSIR</Field>
            </div>
          </div>
          <div className={style.row}>
            <div className={style.flex}>
              <Field lines="single" min={0} max={7} step={1} type="number" name="years left at KTH">Years left at KTH</Field>
            </div>
            <div className={style.third}>
              <Field lines="single" type="text" name="program of study">Program of study</Field>
            </div>
            <div className={style.grid}>
              <span className={style.gridLabel}>Level of study</span>
              <div className={style.gridEntries}>
                {
                  LevelOfStudyChoices.map(choice => (
                    <Radio name="level of study" value={choice} className={style.gridEntry}>{choice}</Radio>
                  ))
                }
              </div>
            </div>
          </div>
          <div className={style.row}>
            <div className={style.flex}>
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}