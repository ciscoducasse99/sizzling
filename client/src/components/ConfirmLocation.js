import React from "react";
import { Link } from "react-router-dom";
import { Button, Spinner} from "reactstrap";
import "../App.css";

const ConfirmLocation = () => {
  const [location, setLocation] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setLocation(true);
    }, 3000);

    const cleanup=()=>{
      setLocation(true)
    }
    return cleanup
  });

  return (
    <div>
      {location === false ? (
        <div className="text-center m-4">
          <h5 className="mb-5">Locating restaurant...please wait</h5>
          <Spinner color="dark" />
        </div>
      ) : (
        <div className="text-center m-4">
          <h4 className="text-primary mb-3">Location found</h4>
          <i
            className=" text-white fa-2x fa fa-map-marker mb-3"
            aria-hidden="true"
          />
          <h5 className="mb-3">Applebees located in Lowell, Ma</h5>
          <Link to="/users/1/menu">
            <Button color="primary" outline={true} className="rounded-pill">
              View Menu
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ConfirmLocation;
