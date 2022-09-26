import {CoursePart} from '../types'

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch(part.type) {
    case "normal":
      return (
        <div>
          <p><strong>{part.name} {part.exerciseCount}</strong></p>
          <p>{part.description}</p>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <p><strong>{part.name} {part.exerciseCount}</strong></p>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      );
    case "submission":
      return (
        <div>
          <p><strong>{part.name} {part.exerciseCount}</strong></p>
          <p>{part.description}</p>
          <p>submit to {part.exerciseSubmissionLink}</p>
        </div>
      );
      case "special":
        return (
          <div>
            <p><strong>{part.name} {part.exerciseCount}</strong></p>
            <p>{part.description}</p>
            <p>required skills: {part.requirements.map((requirement, index) => {
              return <i key={index}>{requirement} </i>
            })}
            </p>
          </div>
        );
    default:
      return assertNever(part)
  }
};

export default Part;
