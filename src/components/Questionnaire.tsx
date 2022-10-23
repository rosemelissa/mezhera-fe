import { useEffect } from "react";
import { useAppContext } from "../App";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import { useStyles } from "../utils/useStyles";

export default function Questionnaire(): JSX.Element {
  const classes = useStyles();
  const { state, actions, dispatch } = useAppContext();
  const subjectChoices = [
    "Investing",
    "Housing & renting",
    "Property market",
    "Loans & credit",
    "Banking & saving",
    "Career advice",
    "Tax",
  ];

  useEffect(() => {
    // console.log(state.userSubjectChoices)
  }, [state.subjectCount, state.userSubjectChoices]);

  const handleSubjectButtonClick = (subject: string) => {
    if (state.userSubjectChoices.includes(subject)){
      swal({  
      title: "Error!",
      text: "You have already chosen this subject",
      icon: "error",
    });
    }
    else {
      dispatch(actions.userSubjectChoices.create.push(subject))
      dispatch(actions.subjectCount.create.increment())
    }
  };

  const handleClearAllClick = () => {
    dispatch(actions.subjectCount.create.reset());
    dispatch(actions.userSubjectChoices.create.reset());
  };

  return (
    <div className={classes.body}>
      <h1 className={classes.title}>
        {"Which areas of finance are you looking for mentorship on ?"}
      </h1>
      <h2 className={classes.title}>{`${state.subjectCount}/3`}</h2>
      <div className={classes.buttonsContainer}>
        {subjectChoices.map((subject, id) => {
          return (
            <Button
              key={id}
              className={classes.button}
              variant="contained"
              classes={{ contained: classes.buttonFill }}
              disabled={state.subjectCount === 3 ? true : false}
              onClick={() => handleSubjectButtonClick(subject)}
            >
              {subject}
            </Button>
          );
        })}
      </div>
      <div className={classes.clearButtonContainer}>
        <Button
          className={classes.clearAllButton}
          onClick={handleClearAllClick}
        >
          {"Clear all"}
        </Button>
      </div>
      <div className={classes.nextButtonContainer}>
        {state.subjectCount === 3 && (
          <Button className={classes.nextButton}>
            <Link to="/select-accessibility" className={classes.nextLink}>
              {"Next"}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
