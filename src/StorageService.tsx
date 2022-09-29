let projectID = '';
let token = '';

export function StorageService() {

    function getToken() {
        return token
    }

    function getProjectID() {
        return projectID
    }

    function setStorage(projectIDParameter: string, tokenParameter: string) {
        if(projectIDParameter == null && tokenParameter == null) {
            projectID = projectIDParameter;
            token = tokenParameter
        } else {
            projectID = projectIDParameter;
            token = tokenParameter
        }
    }

}