import { h, Component } from "preact";
import linkState from "linkstate";

import Field from "../field";
import Button from "../button";
import Radio from "../radio";

import style from "./style.scss";

const KTHMailRegexPattern = "[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@(?:[a-zA-Z0-9-]+\\.)*(?:kth\\.se)";

const LevelOfStudyChoices = [
  "bachelor",
  "master",
  "civilingenjör",
  "other"
];

export default class RecruitmentForm extends Component {
  static potName = "backend-id";
  static potDefaultValue = "go-for-launch";
  
  static formAction = "/thank-you";
  static formName = "contact";

  static maxYears = 10;

  static validate = (state) => {
    if (typeof state.name !== "string" || state.name.length === 0) return false;
    if (typeof state.mail !== "string" || state.mail.length === 0) return false;
    if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@(?:[a-zA-Z0-9-]+\.)*(?:kth\.se)$/.test(state.mail.trim())) return false;
    if (typeof state.describeYourself !== "string" || state.describeYourself.length === 0) return false;
    if (typeof state.programOfStudy !== "string" || state.programOfStudy.length === 0) return false;
    if (typeof state.levelOfStudy !== "string" || state.levelOfStudy.length === 0) return false;

    const yearsLeft = parseInt(state.yearsLeft, 10);
    if (isNaN(yearsLeft)) return false;
    if (yearsLeft < 0 || yearsLeft > RecruitmentForm.maxYears) return false;

    return true;
  };

  render({ applyingForRole, onClearRole }, state) {
    const isServerRender = typeof window === "undefined";
    const stateIsValid = isServerRender ? false : RecruitmentForm.validate(state);
    return (
      <form
        id="recruitment"
        method="post"
        className={style.recruitmentForm}

        action={RecruitmentForm.formAction}
      >
        <input type="hidden" name="form-name" value={RecruitmentForm.formName} />
        <input type="hidden" name="applying for" value={applyingForRole} />
        <div hidden className={style.hidden}>
          <label>resistance is futile: <input name={RecruitmentForm.potName} value={!stateIsValid ? RecruitmentForm.potDefaultValue : null} /></label>
        </div>
        <div className={style.container}>
          <div className={style.row}>
            <div className={style.flex}>
              <Field lines="single" type="text" name="name" value={state.name} onInput={linkState(this, "name")}>Your name</Field>
            </div>
            <div className={style.flex}>
              <Field lines="single" type="email" name="email" pattern={KTHMailRegexPattern} value={state.mail} onInput={linkState(this, "mail")}>Your KTH email</Field>
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
              <Field lines="multiple" type="text" name="describe yourself" value={state.describeYourself} onInput={linkState(this, "describeYourself")}>Describe what you could help out with at ÆSIR</Field>
            </div>
          </div>
          <div className={style.row}>
            <div className={style.flex}>
              <Field
                lines="single"
                min={0}
                max={RecruitmentForm.maxYears}
                step={1}
                type="number"
                name="years left at KTH"
                value={state.yearsLeft}
                onInput={linkState(this, "yearsLeft")}
              >
                Whole years left at KTH
              </Field>
            </div>
            <div className={style.third}>
              <Field
                lines="single"
                type="text"
                name="program of study"
                value={state.programOfStudy}
                onInput={linkState(this, "programOfStudy")}
              >
                Program of study
              </Field>
            </div>
            <div className={style.grid}>
              <span className={style.gridLabel}>Level of study</span>
              <div className={style.gridEntries}>
                {
                  LevelOfStudyChoices.map(choice => (
                    <Radio
                      name="level of study"
                      value={choice}
                      className={style.gridEntry}
                      checked={state.levelOfStudy === choice}
                      onChange={(linkState(this, "levelOfStudy", "target.value"))}
                    >
                      {choice}
                    </Radio>
                  ))
                }
              </div>
            </div>
          </div>
          <div className={style.row}>
            <div className={style.flex}>
              <Button disabled={!stateIsValid} type="submit">Submit</Button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}