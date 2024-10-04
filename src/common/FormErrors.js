import { ExclamationIcon } from "@heroicons/react/outline";
import { Alert, List } from "flowbite-react";

export const FormErrors = ({ error }) => {
    let errorBody = <></>;
    if (error?.violations) {
        errorBody = (<ul>
            {error.violations.map((violation, idx) => <li key={idx}>{violation.violation}</li>)}
        </ul>);
    } else if(error?.errorMessage) {
        errorBody = error.errorMessage
    }


    return (
        <Alert color="failure" icon={ExclamationIcon}>
            {errorBody}
        </Alert>
    );
}