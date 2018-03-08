import { h, Component } from "preact";
import style from "./style";
import Button from "../forms/button";

class Role extends Component {
  onApplyFor = () => {
    this.props.onApplyForRole && this.props.onApplyForRole(this.props.recruitmentTitle);
  };

  render({ selected, onApplyForRole, title, description, shouldLike, requirements }) {
    if (!title) throw new Error("Expected description");
    if (!description) throw new Error("Expected description");
    
    return (
      <div className={style.role}>
        <header>{title}</header>
        <p>{description}</p>
        
        <footer>
          { Array.isArray(requirements) && (
            <div className={style.requirements}>
              <header>It would be good if you:</header>
              <ul>
                { requirements.map(el => <li key={el}>{el}</li> ) }
              </ul>
            </div>
          ) }
          { Array.isArray(shouldLike) && (
            <div className={style.shouldLike}>
              <header>You should want to do the following:</header>
              <ul>
                { shouldLike.map(el => <li key={el}>{el}</li> ) }
              </ul>
            </div>
          ) }
          <div className={style.actions + " noscript-hide"}>
            <Button disabled={selected} onClick={this.onApplyFor}>
              { selected ? "Applying for this role" : "Apply for this role"}
            </Button>
          </div>
        </footer>
      </div>
    );
  }
}

export default class Recruitment extends Component {
  render({ applyingForRole, onApplyForRole, specificRoles, genericRoles }) {
    return (
      <div className={style.roles}>
        <header>Specific positions</header>
        {
          Object.keys(specificRoles).map(key => (
            <Role selected={specificRoles[key].recruitmentTitle===applyingForRole} onApplyForRole={onApplyForRole} key={key} {...specificRoles[key]} />
          ))
        }
        <header>Other roles</header>
        {
          Object.keys(genericRoles).map(key => (
            <Role selected={genericRoles[key].recruitmentTitle===applyingForRole} onApplyForRole={onApplyForRole} key={key} {...genericRoles[key]} />
          ))
        }
      </div>
    );
  }
}