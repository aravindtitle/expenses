import { Link } from "react-router-dom";

function ProfileCompletionMessage() {
  return (
    <div>
      <p>
        Your profile is incomplete.{" "}
        <Link to="/update-profile">Complete now</Link>
      </p>
    </div>
  );
}
export default ProfileCompletionMessage;
